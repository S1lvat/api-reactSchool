class HomeController {
  index (req, res) {
    res.send('Ola, mundo!')
  }
}

export default new HomeController()
