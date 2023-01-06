class HomeController {
  async index (req, res) {
    res.status(200).json('home')
  }
}

export default new HomeController()
