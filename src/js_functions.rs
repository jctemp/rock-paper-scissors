use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    /// The `Math.random()` static method returns a floating-point, pseudo-random
    /// number that's greater than or equal to 0 and less than 1, with
    /// approximately uniform distribution over that range — which you can then
    /// scale to your desired range. The implementation selects the initial seed
    /// to the random number generation algorithm; it cannot be chosen or reset
    /// by the user.
    ///
    /// [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
    #[wasm_bindgen(js_namespace = Math)]
    pub fn random() -> f64;
}
