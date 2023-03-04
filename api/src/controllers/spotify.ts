
import SpotifyWebApi from "spotify-web-api-node";
import AppDataSource from "../config/database";
import { ActivityType } from "../models/activity";
import { SpotifySecret } from "../models/spotifysecret";
import ActivityController from "./activity";

interface SetSpotifySecretRequest {
  clientId: string;
  clientSecret: string;
}

interface SetSpotifySecretResponse {
  success: boolean;
}

export default class SpotifyController {
  public async getInstance(): Promise<SpotifyWebApi> {    
    const spotifyCreds = await AppDataSource.manager
      .getRepository(SpotifySecret)
      .createQueryBuilder('secret')
      .limit(1)
      .getOne();

    const spotifyApi = new SpotifyWebApi({
      clientId: spotifyCreds?.clientid,
      clientSecret: spotifyCreds?.clientsecret,
      redirectUri: 'http://www.example.com/callback'
    });

    try {
      const credentials = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(credentials.body['access_token']);
    } catch(error) {
      console.log(error);
    }

    return spotifyApi;
  }

  public async setSecret(request: SetSpotifySecretRequest): Promise<SetSpotifySecretResponse> {
    console.log("setSecret", request);

    let spotifySecret: SpotifySecret | null = await AppDataSource.manager
      .getRepository(SpotifySecret)
      .createQueryBuilder("secret")
      .getOne();

    if (!spotifySecret) {
      spotifySecret = new SpotifySecret();
    }

    spotifySecret.clientid = request.clientId;
    spotifySecret.clientsecret = request.clientSecret;
    
    
    await AppDataSource.manager.save(spotifySecret);
    new ActivityController().addActivity('ClientId: ' + spotifySecret.clientid, ActivityType.SPOTIFY_SECRET_UPDATED);
    return {
      success: true,
    };
  }
}