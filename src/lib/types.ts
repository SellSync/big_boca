export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
}

export interface OrderItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  items: OrderItem[]
  total: number
  status: "pending" | "completed"
  createdAt: string
}

