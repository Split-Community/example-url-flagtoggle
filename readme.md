# Enable-Disable Flags

This project demonstrates how to use URL query parameters to set treatments for testing that override the Split SDK. It allows you to easily enable or disable specific features or flags in your application by simply modifying the URL.

## Installation

To use this project, follow these steps:

1. Clone the repository: `git clone https://github.com/split-community/example-url-flagtoggle.git`
2. Run with your favorite webserver (such as `python -m http.server`)

## Usage

To enable or disable specific flags, modify the URL query parameters as follows:

- To enable a flag, add `?flagName=on` to the URL.
- To disable a flag, add `?flagName=off` to the URL.

For example, to enable the `featureA` flag, your URL would look like this: `http://localhost:3000/?feature_a=on`. Similarly, to disable the `featureB` flag, your URL would be `http://localhost:3000/?feature_b=off`.


One key piece in the JS code is the `getFeatureFlag` function that wraps the Split SDK and overrides it with the results of the query parameter
```javascript
const getFeatureFlag = (featureName) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(featureName)) {
    return urlParams.get(featureName) === "on" ? true : false;
  } else {
    return client.getTreatment(featureName) === "on" ? true : false;
  }
};
```


## License

This project is licensed under the MIT License. 
