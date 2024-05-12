import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./models/user";
import { Technician } from "./models/technician";
import { Complain } from "./models/complain";
import { Packages } from "./models/packages";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "pug");
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/static"));

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root123",
  database: "isp_project",
  entities: [User,Complain,Packages,Technician],
  synchronize: true
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.get("/home", (req, res) => {
  res.render("web.pug");
});
app.get("/", (req, res) => {
  res.render("login.pug");
});
app.get("/technician", (req, res) => {
  res.render("technicians.pug");
});
app.get("/packages", (req, res) => {
  res.render("packages.pug");
});

app.get("/complain", (req, res) => {
  res.render("complain.pug");
  3;
});

app.get("/signup", (req, res) => {
  res.render("signup.pug");
});
app.get("/packagesbill", (req, res) => {
  res.render("packagesbill.pug");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus.pug");
});

app.post("/signup", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      password,
      email,
      age,
      nic,
      contact,
      adress,
      gender,
    } = req.body;

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.age = age;
    user.nic = nic;
    user.contact = contact;
    user.adress = adress;
    user.gender = gender;

    await AppDataSource.manager.save(user);

    res.status(200);

    res.redirect("/");
  } catch (error) {
    console.error("Error saving user to the database:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/complain", async (req, res) => {
  try {
    const { firstname, lastname, complain, email } = req.body;

    const user = new Complain();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.complain = complain;

    await AppDataSource.manager.save(user);

    return res.render('complain.pug',);

  } catch (error) {
    console.error("Error saving user to the database:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/packagesbill", async (req, res) => {
  try {
    const { firstname, lastname, email, contact } = req.body;

    const user = new Packages();
    user.firstname = firstname;
    user.lastname = lastname;
    user.contact = contact;
    user.email = email;

    await AppDataSource.manager.save(user);

    res.status(200).render("packagesbill.pug");
  } catch (error) {
    console.error("Error saving user to the database:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      if (existingUser.password === password) {
        return res.redirect("/home");
      } else {
        return res.render('login.pug', { alert: "Incorrect password" });
      }
    } else {
      return res.redirect("/signup");
    }
  } catch (error) {
    console.error('Error handling login:', error);
    return res.status(500).send('Internal Server Error');
  }
});


app.get("/technicians", async (req, res) => {
  try {
    const allTechnicians = await AppDataSource.getRepository(Technician).find();

    console.log("allTechnicians",allTechnicians);

    if (allTechnicians.length > 0) {
      res.render("technicians", { technicians: allTechnicians });
    } else {
      console.log("No technicians found");
      res.status(404).send("No Technicians Found");
    }
  } catch (error) {
    console.error("Error retrieving technicians:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
