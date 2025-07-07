import { cartModel, ICart, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface AddItemsToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemsToCart) => {
  const cart = await getActiveCartForUser({ userId });
  //check if item exist in the cart
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );
  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  //fetch ptoduct in cart
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for Item", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface UpdateItemsInCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemsInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );
  if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for Item", statusCode: 400 };
  }

  existsInCart.quantity = quantity;
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculateCartTotalItems({ cartItems: otherCartItems });

  total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface DeleteItemInCart {
  productId: any;
  userId: string;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );
  if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = calculateCartTotalItems({ cartItems: otherCartItems });
  cart.items = otherCartItems;
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  return total;
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Please add the address", statusCode:400}
  }
  const cart = await getActiveCartForUser({ userId });

  const orderItems : IOrderItem[] = []
  //Loop cartItems and create orderItems
  for (const item of cart.items) {
    const product = await productModel.findById(item.product)

    if (!product) {
      return {data:"Product not found", statusCode: 400}
    }
    const orderItem : IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      unitPrice: item.unitPrice
    }

    orderItems.push(orderItem)
  }
  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  })

  await order.save();
  //Update cart status to be completed
  cart.status = "completed";
  await cart.save();
  return {data: order ,  statusCode: 200}
};
