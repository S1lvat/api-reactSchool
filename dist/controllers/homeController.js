"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index (req, res) {
    res.status(200).json('home')
  }
}

exports. default = new HomeController()
