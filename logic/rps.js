let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* Converts a string into a selection. The function fails if the
* provided string is not in the following list:
* `"rock", "paper", "scissors"`
* @param {string} selection
* @returns {number}
*/
export function stringToSelection(selection) {
    const ptr0 = passStringToWasm0(selection, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.stringToSelection(ptr0, len0);
    return ret >>> 0;
}

/**
* Samples randomly a selection type using the JavaScript `random()`
* function. All options have an equal probability.
* @returns {number}
*/
export function sampleSelection() {
    const ret = wasm.sampleSelection();
    return ret >>> 0;
}

/**
* Represents a round in a game. It checks the two inputs and
* determines based on the rules of rock-paper-scissors the winner.
* @param {number} player
* @param {number} computer
* @returns {Versus}
*/
export function round(player, computer) {
    const ret = wasm.round(player, computer);
    return Versus.__wrap(ret);
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
* Generates based pn the Versus struct a custom message for the
* player.
* @param {Versus} versus
* @returns {string}
*/
export function message(versus) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(versus, Versus);
        var ptr0 = versus.__destroy_into_raw();
        wasm.message(retptr, ptr0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
    }
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
* The selection enum represent the options players have to
* choose from as an action. The primary goal of it is to
* remove the need for a string-based interface.
*/
export const Selection = Object.freeze({ Rock:0,"0":"Rock",Paper:1,"1":"Paper",Scissors:2,"2":"Scissors", });
/**
* Represents the different types of players that can win a game.
* The premise for the current implementation is that a human
* always plays against a computer.
*/
export const Role = Object.freeze({ Human:0,"0":"Human",Computer:1,"1":"Computer",None:2,"2":"None", });
/**
* A struct which contains the final state of a round. It is used
* later to create a customised message for the player.
*/
export class Versus {

    static __wrap(ptr) {
        const obj = Object.create(Versus.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_versus_free(ptr);
    }
    /**
    * @returns {number}
    */
    get player() {
        const ret = wasm.__wbg_get_versus_player(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set player(arg0) {
        wasm.__wbg_set_versus_player(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get computer() {
        const ret = wasm.__wbg_get_versus_computer(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set computer(arg0) {
        wasm.__wbg_set_versus_computer(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get winner() {
        const ret = wasm.__wbg_get_versus_winner(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set winner(arg0) {
        wasm.__wbg_set_versus_winner(this.ptr, arg0);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_random_a2e52e22a951a547 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('rps_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
