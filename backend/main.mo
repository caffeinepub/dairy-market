import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";
import Float "mo:core/Float";

(with migration = Migration.run)
actor {
  type Size = {
    name : Text;
    available : Bool;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    brand : Text;
    category : Text;
    price : Float;
    originalPrice : ?Float;
    imageUrl : Text;
    sizes : [Size];
    rating : Float;
  };

  type CartItem = {
    product : Product;
    quantity : Nat;
    selectedSize : Text;
  };

  var nextProductId = 1;
  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, List.List<CartItem>>();

  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    brand : Text,
    category : Text,
    price : Float,
    originalPrice : ?Float,
    imageUrl : Text,
    sizes : [Size],
    rating : Float,
  ) : async () {
    let id = nextProductId;
    let product : Product = {
      id;
      name;
      description;
      brand;
      category;
      price;
      originalPrice;
      imageUrl;
      sizes;
      rating;
    };
    products.add(id, product);
    nextProductId += 1;
  };

  public shared ({ caller }) func initializeDefaultProducts() : async () {
    await addProduct(
      "Classic Denim Jeans",
      "High-quality denim jeans for everyday wear.",
      "Levi's",
      "Men",
      59.99,
      ?79.99,
      "https://source.unsplash.com/400x400/?jeans",
      [ { name = "S"; available = true }, { name = "M"; available = true }, { name = "L"; available = true }, { name = "XL"; available = false } ],
      4.5,
    );

    await addProduct(
      "Summer Dress",
      "Light and breezy summer dress perfect for warm days.",
      "H&M",
      "Women",
      39.99,
      ?49.99,
      "https://source.unsplash.com/400x400/?dress",
      [ { name = "XS"; available = true }, { name = "S"; available = true }, { name = "M"; available = false }, { name = "L"; available = true } ],
      4.8,
    );

    await addProduct(
      "Kids T-Shirt Pack",
      "Soft cotton t-shirts for kids, pack of 3.",
      "Carter's",
      "Kids",
      24.99,
      null,
      "https://source.unsplash.com/400x400/?kids-tshirt",
      [ { name = "2T"; available = true }, { name = "3T"; available = true }, { name = "4T"; available = true } ],
      4.3,
    );

    await addProduct(
      "Men's Hoodie",
      "Comfortable and stylish hoodie for men.",
      "Nike",
      "Men",
      69.99,
      ?89.99,
      "https://source.unsplash.com/400x400/?hoodie",
      [ { name = "M"; available = true }, { name = "L"; available = true } ],
      4.7,
    );

    await addProduct(
      "Women's Blouse",
      "Elegant blouse suitable for work or casual outings.",
      "Zara",
      "Women",
      54.99,
      null,
      "https://source.unsplash.com/400x400/?blouse",
      [ { name = "S"; available = true }, { name = "M"; available = true }, { name = "L"; available = false } ],
      4.6,
    );

    await addProduct(
      "Running Shoes",
      "Lightweight running shoes for all activities.",
      "Adidas",
      "Accessories",
      89.99,
      ?109.99,
      "https://source.unsplash.com/400x400/?shoes",
      [ { name = "7"; available = true }, { name = "8"; available = true }, { name = "9"; available = true }, { name = "10"; available = false } ],
      4.9,
    );

    await addProduct(
      "Winter Jacket",
      "Warm and stylish winter jacket.",
      "North Face",
      "Men",
      129.99,
      ?159.99,
      "https://source.unsplash.com/400x400/?jacket",
      [ { name = "M"; available = true }, { name = "L"; available = true }, { name = "XL"; available = true } ],
      4.8,
    );

    await addProduct(
      "Women's Handbag",
      "Elegant handbag with ample storage space.",
      "Michael Kors",
      "Accessories",
      199.99,
      null,
      "https://source.unsplash.com/400x400/?handbag",
      [],
      4.7,
    );

    await addProduct(
      "Kids Sneakers",
      "Durable and comfortable sneakers for kids.",
      "Puma",
      "Kids",
      49.99,
      null,
      "https://source.unsplash.com/400x400/?kids-shoes",
      [ { name = "5"; available = true }, { name = "6"; available = true } ],
      4.4,
    );

    await addProduct(
      "Men's Polo Shirt",
      "Classic polo shirt for casual and formal occasions.",
      "Ralph Lauren",
      "Men",
      44.99,
      ?59.99,
      "https://source.unsplash.com/400x400/?polo-shirt",
      [ { name = "S"; available = true }, { name = "M"; available = true }, { name = "L"; available = true } ],
      4.6,
    );

    await addProduct(
      "Women's Yoga Pants",
      "Comfortable and flexible yoga pants.",
      "Lululemon",
      "Women",
      69.99,
      null,
      "https://source.unsplash.com/400x400/?yoga-pants",
      [ { name = "XS"; available = true }, { name = "S"; available = true }, { name = "M"; available = true } ],
      4.9,
    );

    await addProduct(
      "Kids Winter Hat",
      "Warm and colorful winter hat for kids.",
      "The Children's Place",
      "Kids",
      14.99,
      null,
      "https://source.unsplash.com/400x400/?kids-hat",
      [],
      4.5,
    );

    await addProduct(
      "Men's Dress Pants",
      "Formal dress pants for men.",
      "Calvin Klein",
      "Men",
      79.99,
      ?99.99,
      "https://source.unsplash.com/400x400/?dress-pants",
      [ { name = "32"; available = true }, { name = "34"; available = true } ],
      4.7,
    );

    await addProduct(
      "Women's Scarf",
      "Stylish scarf for all seasons.",
      "Gap",
      "Accessories",
      29.99,
      null,
      "https://source.unsplash.com/400x400/?scarf",
      [],
      4.8,
    );

    await addProduct(
      "Kids Pajama Set",
      "Comfortable and cute pajama set for kids.",
      "Old Navy",
      "Kids",
      34.99,
      ?44.99,
      "https://source.unsplash.com/400x400/?kids-pajamas",
      [ { name = "XS"; available = true }, { name = "S"; available = true } ],
      4.6,
    );

    await addProduct(
      "Men's Leather Belt",
      "Durable and stylish leather belt.",
      "Dockers",
      "Accessories",
      24.99,
      ?34.99,
      "https://source.unsplash.com/400x400/?belt",
      [ { name = "M"; available = true }, { name = "L"; available = true } ],
      4.7,
    );

    await addProduct(
      "Women's Sunglasses",
      "Fashionable sunglasses with UV protection.",
      "Ray-Ban",
      "Accessories",
      149.99,
      ?189.99,
      "https://source.unsplash.com/400x400/?sunglasses",
      [],
      4.9,
    );

    await addProduct(
      "Kids Raincoat",
      "Waterproof and fun raincoat for kids.",
      "Columbia",
      "Kids",
      39.99,
      ?49.99,
      "https://source.unsplash.com/400x400/?kids-raincoat",
      [ { name = "S"; available = true }, { name = "M"; available = true } ],
      4.4,
    );

    await addProduct(
      "Men's Watch",
      "Elegant watch with leather strap.",
      "Fossil",
      "Accessories",
      129.99,
      ?159.99,
      "https://source.unsplash.com/400x400/?watch",
      [],
      4.8,
    );

    await addProduct(
      "Women's Boots",
      "Stylish and comfortable boots.",
      "Steve Madden",
      "Women",
      99.99,
      ?129.99,
      "https://source.unsplash.com/400x400/?boots",
      [ { name = "6"; available = true }, { name = "7"; available = true }, { name = "8"; available = true } ],
      4.7,
    );
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let productsList = List.empty<Product>();
    for (product in products.values()) {
      if (Text.equal(product.category, category)) {
        productsList.add(product);
      };
    };
    productsList.toArray();
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat, selectedSize : Text) : async () {
    let product = switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    if (product.sizes.size() > 0) {
      let sizeAvailable = switch (product.sizes.find(func(size) { Text.equal(size.name, selectedSize) })) {
        case (null) { false };
        case (?size) { size.available };
      };
      if (not sizeAvailable) {
        Runtime.trap("Selected size not available");
      };
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    let updatedCartItems = switch (cart.toArray().find(func(item) { item.product.id == productId and Text.equal(item.selectedSize, selectedSize) })) {
      case (null) {
        cart.toArray().concat([{
          product;
          quantity;
          selectedSize;
        }]);
      };
      case (?_) {
        cart.toArray().map(func(item) {
          if (item.product.id == productId and Text.equal(item.selectedSize, selectedSize)) {
            { product; quantity = item.quantity + quantity; selectedSize };
          } else { item };
        });
      };
    };

    let newCart = List.empty<CartItem>();
    for (item in updatedCartItems.values()) {
      newCart.add(item);
    };
    carts.add(caller, newCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat, selectedSize : Text) : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?existingCart) { existingCart };
    };

    let updatedCart = cart.filter(func(item) { item.product.id != productId or not Text.equal(item.selectedSize, selectedSize) });

    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func updateCartQuantity(productId : Nat, selectedSize : Text, newQuantity : Nat) : async () {
    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?existingCart) { existingCart };
    };

    let updatedCartItems = cart.toArray().map(func(item) {
      if (item.product.id == productId and Text.equal(item.selectedSize, selectedSize)) {
        if (newQuantity == 0) {
          Runtime.trap("Quantity cannot be zero. Remove item instead.");
        };
        { item with quantity = newQuantity };
      } else { item };
    });

    let newCart = List.empty<CartItem>();
    for (item in updatedCartItems.values()) {
      newCart.add(item);
    };
    carts.add(caller, newCart);
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

  public query ({ caller }) func getCartTotal() : async Float {
    switch (carts.get(caller)) {
      case (null) { 0 };
      case (?cart) {
        var total : Float = 0;
        for (item in cart.values()) {
          let itemPrice = switch (item.product.originalPrice) {
            case (null) { item.product.price };
            case (?original) { if (original > item.product.price) { item.product.price } else { original } };
          };
          total += (itemPrice * item.quantity.toFloat());
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

    // Here you would typically process the order. For this example, we'll just clear the cart.
    carts.remove(caller);
  };

  public shared ({ caller }) func updateProductRating(productId : Nat, newRating : Float) : async () {
    if (newRating < 0 or newRating > 5) {
      Runtime.trap("Rating must be between 0 and 5");
    };

    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let updatedProduct = { product with rating = newRating };
        products.add(productId, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func getProductById(productId : Nat) : async Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProductCount() : async Nat {
    products.size();
  };
};
