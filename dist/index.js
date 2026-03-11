"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const bootstrap = async function () {
    try {
        app.listen(3617, () => {
            console.log('app running at port 3617');
        });
    }
    catch (err) {
        console.log('app not running', err);
    }
};
bootstrap();
