import Order from "../models/Order.js";
import bcrypt from "bcryptjs";

async function getAll(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", ["-password"])
      .populate("products.product");
    if (orders) {
      return res.json({ orders: orders });
    } else {
      return res.json("No hay ordenes creadas");
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json("Internal server error");
  }
}
async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      return res.json({ order: order });
    } else {
      return res.json("No se encontró el usuario");
    }
  } catch (error) {
    return res.status(500).json("Orden no encontrada");
  }
}
async function createOrder(req, res) {
  try {
    const { products, shippingAdress, paymentMethod, total } = req.body;

    const newOrder = await Order.create({
      user: req.auth.id,
      products,
      total,
      shippingAdress,
      paymentMethod,
    });
    return res.json("Order created!");
  } catch (error) {
    //console.log(error)
    return res.status(500).json("Internal server error");
  }
}
async function updateOrder(req, res) {
  const orderToUpdate = await Order.findById(req.params.id);

  if (orderToUpdate !== null) {
    const { products, shippingAdress, paymentMethod, total } = req.body;
    orderToUpdate.user = req.auth.id || orderToUpdate.user;
    orderToUpdate.products = products || orderToUpdate.products;
    orderToUpdate.total = total || orderToUpdate.total;
    orderToUpdate.shippingAdress =
      shippingAdress || orderToUpdate.shippingAdress;
    orderToUpdate.paymentMethod = paymentMethod || orderToUpdate.paymentMethod;

    await orderToUpdate.save();

    return res.json("La orden ha sido actualizada");
  } else {
    return res.json("No existe una orden con el ID mencionado");
  }
}

async function destroyOrder(req, res) {
  const orderToDelete = await Order.findById(req.params.id);

  orderToDelete.deletedAt = Date.now();
  orderToDelete.save();

  return res.json("La receta se ha eliminado");
}

export default {
  getAll,
  getOrderById,
  createOrder,
  updateOrder,
  destroyOrder,
};
