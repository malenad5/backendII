class ViewsController {
    constructor() {}
  
    home = (req, res) => {
      res.render("home", {});
    };
  
    login = (req, res) => {
      res.render("login", {});
    };
  
    register = (req, res) => {
      res.render("register", {});
    };
  }
  
  export default ViewsController;
  