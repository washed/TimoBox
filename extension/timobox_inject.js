let observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (!mutation.addedNodes) return

		for (let i = 0; i < mutation.addedNodes.length; i++) {
			// do things to your newly added nodes here
			let node = mutation.addedNodes[i]
			console.log("New node:" + node);
		}
	})
})

observer.observe(document.body, {
	childList: true
	, subtree: true
	, attributes: false
	, characterData: false
})

// stop watching using:
observer.disconnect()