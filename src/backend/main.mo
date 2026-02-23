import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  type CartItem = {
    product : Product;
    quantity : Nat;
  };

  var nextProductId = 0;
  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, List.List<CartItem>>();

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, imageUrl : Text) : async () {
    let id = nextProductId;
    let product : Product = {
      id;
      name;
      description;
      price;
      imageUrl;
    };
    products.add(id, product);
    nextProductId += 1;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    let productList = List.empty<Product>();
    for (product in products.values()) {
      productList.add(product);
    };
    productList.toArray();
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    let product = switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    let cartArray = cart.toArray();
    let updatedCartArray = switch (cartArray.find(func(item) { item.product.id == productId })) {
      case (null) {
        cartArray.concat([{
          product;
          quantity;
        }]);
      };
      case (?cartData) {
        cartArray.map(func(item) { if (item.product.id == productId) { { product; quantity = item.quantity + quantity } } else { item } });
      };
    };

    let newCart = List.empty<CartItem>();
    for (item in updatedCartArray.values()) {
      newCart.add(item);
    };
    carts.add(caller, newCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?existingCart) { existingCart };
    };

    let updatedCart = cart.filter(func(item) { item.product.id != productId });

    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public query ({ caller }) func getCartTotal() : async Nat {
    switch (carts.get(caller)) {
      case (null) { 0 };
      case (?cart) {
        var total = 0;
        for (item in cart.values()) {
          total += item.product.price * item.quantity;
        };
        total;
      };
    };
  };

  public shared ({ caller }) func checkout() : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?existingCart) { existingCart };
    };

    if (cart.isEmpty()) {
      Runtime.trap("Cart is empty");
    };

    carts.remove(caller);
  };
};
