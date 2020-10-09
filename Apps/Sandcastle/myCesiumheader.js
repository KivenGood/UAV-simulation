/*var myurl=document.location.href;//alert(myurl);
//http://localhost:8080/  file:///D:/cesium/Apps/Sandcastle/gallery/Camera_.html
if(myurl.indexOf("localhost:8080")<0){
   var key="/cesium/";
   var i=myurl.indexOf(key)+key.length;
   document.location.href="http://localhost:8080/"+myurl.substr(i,999);
}*/
function timer() {
  return Date.now();
//return (new Date()).getTime();//ms
}

function degtorad(degrees) {
  return degrees * Math.PI / 180;
}

var VK_CANCEL = 3, VK_HELP = 6, VK_BACK_SPACE = 8, VK_TAB = 9, VK_CLEAR = 12, VK_RETURN = 13, VK_ENTER = 14,
  VK_SHIFT = 16, VK_CONTROL = 17, VK_ALT = 18, VK_PAUSE = 19, VK_CAPS_LOCK = 20, VK_ESCAPE = 27, VK_SPACE = 32,
  VK_PAGE_UP = 33, VK_PAGE_DOWN = 34, VK_END = 35, VK_HOME = 36, VK_LEFT = 37, VK_UP = 38, VK_RIGHT = 39, VK_DOWN = 40,
  VK_PRINTSCREEN = 44, VK_INSERT = 45, VK_DELETE = 46, VK_0 = 48, VK_1 = 49, VK_2 = 50, VK_3 = 51, VK_4 = 52, VK_5 = 53,
  VK_6 = 54, VK_7 = 55, VK_8 = 56, VK_9 = 57, VK_SEMICOLON = 59, VK_EQUALS = 61, VK_A = 65, VK_B = 66, VK_C = 67,
  VK_D = 68, VK_E = 69, VK_F = 70, VK_G = 71, VK_H = 72, VK_I = 73, VK_J = 74, VK_K = 75, VK_L = 76, VK_M = 77,
  VK_N = 78, VK_O = 79, VK_P = 80, VK_Q = 81, VK_R = 82, VK_S = 83, VK_T = 84, VK_U = 85, VK_V = 86, VK_W = 87,
  VK_X = 88, VK_Y = 89, VK_Z = 90, VK_CONTEXT_MENU = 93, VK_NUMPAD0 = 96, VK_NUMPAD1 = 97, VK_NUMPAD2 = 98,
  VK_NUMPAD3 = 99, VK_NUMPAD4 = 100, VK_NUMPAD5 = 101, VK_NUMPAD6 = 102, VK_NUMPAD7 = 103, VK_NUMPAD8 = 104,
  VK_NUMPAD9 = 105, VK_MULTIPLY = 106, VK_ADD = 107, VK_SEPARATOR = 108, VK_SUBTRACT = 109, VK_DECIMAL = 110,
  VK_DIVIDE = 111, VK_F1 = 112, VK_F2 = 113, VK_F3 = 114, VK_F4 = 115, VK_F5 = 116, VK_F6 = 117, VK_F7 = 118,
  VK_F8 = 119, VK_F9 = 120, VK_F10 = 121, VK_F11 = 122, VK_F12 = 123, VK_F13 = 124, VK_F14 = 125, VK_F15 = 126,
  VK_F16 = 127, VK_F17 = 128, VK_F18 = 129, VK_F19 = 130, VK_F20 = 131, VK_F21 = 132, VK_F22 = 133, VK_F23 = 134,
  VK_F24 = 135, VK_NUM_LOCK = 144, VK_SCROLL_LOCK = 145, VK_COMMA = 188, VK_PERIOD = 190, VK_SLASH = 191,
  VK_BACK_QUOTE = 192, VK_OPEN_BRACKET = 219, VK_BACK_SLASH = 220, VK_CLOSE_BRACKET = 221, VK_QUOTE = 222,
  VK_META = 224, vk_cancel = 3, vk_help = 6, vk_back_space = 8, vk_tab = 9, vk_clear = 12, vk_return = 13,
  vk_enter = 14, vk_shift = 16, vk_control = 17, vk_alt = 18, vk_pause = 19, vk_caps_lock = 20, vk_escape = 27,
  vk_space = 32, vk_page_up = 33, vk_page_down = 34, vk_end = 35, vk_home = 36, vk_left = 37, vk_up = 38, vk_right = 39,
  vk_down = 40, vk_printscreen = 44, vk_insert = 45, vk_delete = 46, vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51,
  vk_4 = 52, vk_5 = 53, vk_6 = 54, vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_semicolon = 59, vk_equals = 61, vk_a = 65,
  vk_b = 66, vk_c = 67, vk_d = 68, vk_e = 69, vk_f = 70, vk_g = 71, vk_h = 72, vk_i = 73, vk_j = 74, vk_k = 75,
  vk_l = 76, vk_m = 77, vk_n = 78, vk_o = 79, vk_p = 80, vk_q = 81, vk_r = 82, vk_s = 83, vk_t = 84, vk_u = 85,
  vk_v = 86, vk_w = 87, vk_x = 88, vk_y = 89, vk_z = 90, vk_context_menu = 93, vk_numpad0 = 96, vk_numpad1 = 97,
  vk_numpad2 = 98, vk_numpad3 = 99, vk_numpad4 = 100, vk_numpad5 = 101, vk_numpad6 = 102, vk_numpad7 = 103,
  vk_numpad8 = 104, vk_numpad9 = 105, vk_multiply = 106, vk_add = 107, vk_separator = 108, vk_subtract = 109,
  vk_decimal = 110, vk_divide = 111, vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
  vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123, vk_f13 = 124, vk_f14 = 125,
  vk_f15 = 126, vk_f16 = 127, vk_f17 = 128, vk_f18 = 129, vk_f19 = 130, vk_f20 = 131, vk_f21 = 132, vk_f22 = 133,
  vk_f23 = 134, vk_f24 = 135, vk_num_lock = 144, vk_scroll_lock = 145, vk_comma = 188, vk_period = 190, vk_slash = 191,
  vk_back_quote = 192, vk_open_bracket = 219, vk_back_slash = 220, vk_close_bracket = 221, vk_quote = 222,
  vk_meta = 224;
var keys = new Array(256), keys0 = new Array(256), tkeys = new Array(256), tkey = 0;
var pkeys = new Array(256);

function resetkeys() {
  for (var i = 0; i < 256; i++) {
    keys[i] = 0;
    keys0[i] = 0;
    tkeys[i] = 0;
  }
}

resetkeys();

function keydown(e) {
  var key = eval(e.which || e.keyCode);
//var t=timer();
  if (key > 0 && key < 256) {
    keys[key] = 1;
    tkeys[key] = timer();
    keys0[key] = 1;
  }
}

function keyup(e) {
  var key = eval(e.which || e.keyCode);
  if (key > 0 && key < 256) {
    keys[key] = 0;
    keys0[key] = 0;
  }
}

document.addEventListener('keydown', function (e) {
  keydown(e);
}, false);
document.addEventListener('keyup', function (e) {
  keyup(e);
}, false);

function sign(xx) {
  if (xx > 0) {
    return 1;
  } else if (xx < 0) {
    return -1;
  } else {
    return 0;
  }
}