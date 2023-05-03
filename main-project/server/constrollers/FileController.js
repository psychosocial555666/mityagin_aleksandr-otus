class FileController {
  async uploadAvatar(req, res) {
    {
      try {
        if (!req.files) {
          res.send({
            status: 501,
            message: "No file uploaded",
          });
        } else {
          let avatar = req.files.avatar;
          avatar.mv(`./files/avatars/${avatar.name}`);

          res.send({
            url: `avatars/${avatar.name}`,
          });
        }
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
  async uploadFilmLogo(req, res) {
    {
      try {
        if (!req.files) {
          res.send({
            status: 501,
            message: "No file uploaded",
          });
        } else {
          let logo = req.files.logo;
          logo.mv(`./files/films/${logo.name}`);

          res.send({
            url: `films/${logo.name}`,
          });
        }
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
}

export const fileController = new FileController();
