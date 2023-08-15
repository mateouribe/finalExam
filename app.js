const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// MongoDB setup
mongoose.connect("mongodb://localhost:27017/finalStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
  //   name: String,
  //   email: String,
  //   phone: Number,
  //   address: String,
  //   city: String,
  //   province: String,
  //   postalCode: String,
  //   watchQuantity: Number,
  //   ipadQuantity: Number,
  //   ipearQuantity: Number,
  //   subtotal: Number,
  //   taxes: Number,
  //   total: Number,
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

const calculateTaxes = (subtotal, province) => {
  const taxRates = {
    AB: 0.05,
    BC: 0.12,
    MB: 0.13,
    NB: 0.15,
    NL: 0.15,
    NS: 0.15,
    NT: 0.05,
    NU: 0.05,
    ON: 0.13,
    PE: 0.15,
    QC: 0.14975,
    SK: 0.11,
    YT: 0.05,
  };

  const taxRate = taxRates[province] || 0;

  return subtotal * taxRate;
};

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", async (req, res) => {
  const orderData = req.body;

  //   if (
  //     !orderData.name ||
  //     !orderData.email ||
  //     !orderData.address ||
  //     !orderData.postalCode ||
  //     !orderData.province ||
  //     !orderData.phone
  //   ) {
  //     return res
  //       .status(400)
  //       .send("Inputs with * are required. Please go back and try again.");
  //   }

  // Calculate subtotal and taxes
  //   const watchQuantity = parseInt(orderData.watch) || 0;
  //   const ipadQuantity = parseInt(orderData.ipad) || 0;
  //   const ipearQuantity = parseInt(orderData.ipear) || 0;

  //   const watchSubtotal = watchQuantity * 300;
  //   const ipadSubtotal = ipadQuantity * 800;
  //   const ipearSubtotal = ipearQuantity * 1000;

  //   const subtotal = watchSubtotal + ipadSubtotal + ipearSubtotal;
  //   const taxes = calculateTaxes(subtotal, orderData.province);

  //   // Calculate total
  //   const total = subtotal + taxes;

  //To show
  //   const order = new Order({
  //     name: orderData.name,
  //     email: orderData.email,
  //     phone: orderData.phone,
  //     address: orderData.address,
  //     city: orderData.city,
  //     province: orderData.province,
  //     postalCode: orderData.postalCode,
  //     watchQuantity: orderData.watch,
  //     ipadQuantity: orderData.ipad,
  //     ipearQuantity: orderData.ipear,
  //     subtotal: subtotal,
  //     taxes: taxes,
  //     total: total,
  //   });

  //   try {
  //     await order.save();
  //     res.redirect(`/receipt/${order._id}`);
  //   } catch (error) {
  //     res.status(500).send("An error occurred while saving the order.");
  //   }

  //   res.send("Order submitted successfully!");
});

// app.get("/receipt/:orderId", async (req, res) => {
//   const orderId = req.params.orderId;
//   const order = await Order.findById(orderId);

//   if (!order) {
//     return res.send("Order not found");
//   }

//   res.render("receipt", { order });
// });

// app.get("/orders", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.render("orders", { orders });
//   } catch (error) {
//     res.status(500).send("An error occurred while fetching orders.");
//   }
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
