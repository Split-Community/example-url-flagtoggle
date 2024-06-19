// Feature flags with default values
let featureFlags = {
  feature_a: true,
  feature_b: false,
};

// Instantiate the SDK. CDN will expose splitio globally
var factory = splitio({
  core: {
    authorizationKey: "ekd9asvl3u7d0b4d2rq265o2itt3ad7tnp1v",
    // key represents your internal user id, or the account id that
    // the user belongs to.
    // This could also be a cookie you generate for anonymous users
    key: "key",
  }
});
// And get the client instance you'll use
var client = factory.client();
const getFeatureFlag = (featureName) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(featureName)) {
    return urlParams.get(featureName) === "on" ? true : false;
  } else {
    return client.getTreatment(featureName) === "on" ? true : false;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  // Override feature flags based on query parameters

  client.on(client.Event.SDK_READY, function () {

        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    // Get the treatment for the key 'key' for the feature 'feature1'

    featureFlags.featureA = getFeatureFlag("feature_a");
    featureFlags.featureB = getFeatureFlag("feature_b");

    initializeFeatures();
  });
});

function initializeFeatures() {
  toggleFeature("feature_a", featureFlags.featureA);
  toggleFeature("feature_b", featureFlags.featureB);
}

function toggleFeature(featureId, isEnabled) {
  const featureElement = document.getElementById(featureId);
  if (isEnabled) {
    featureElement.style.display = "block";
  } else {
    featureElement.style.display = "none";
  }
}
