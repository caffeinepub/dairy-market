import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    quantity: bigint;
    selectedSize: string;
    product: Product;
}
export interface Size {
    name: string;
    available: boolean;
}
export interface Product {
    id: bigint;
    originalPrice?: number;
    name: string;
    description: string;
    sizes: Array<Size>;
    imageUrl: string;
    category: string;
    brand: string;
    rating: number;
    price: number;
}
export interface backendInterface {
    addProduct(name: string, description: string, brand: string, category: string, price: number, originalPrice: number | null, imageUrl: string, sizes: Array<Size>, rating: number): Promise<void>;
    addToCart(productId: bigint, quantity: bigint, selectedSize: string): Promise<void>;
    checkout(): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getCartTotal(): Promise<number>;
    getProductById(productId: bigint): Promise<Product>;
    getProductCount(): Promise<bigint>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    initializeDefaultProducts(): Promise<void>;
    removeFromCart(productId: bigint, selectedSize: string): Promise<void>;
    updateCartQuantity(productId: bigint, selectedSize: string, newQuantity: bigint): Promise<void>;
    updateProductRating(productId: bigint, newRating: number): Promise<void>;
}
