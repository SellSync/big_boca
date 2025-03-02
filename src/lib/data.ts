import type { MenuItem, Order } from "./types"

export function getMockMenuItems(): MenuItem[] {
  return [
    {
      id: "item-1",
      name: "X-Burger",
      description: "Hambúrguer com queijo, alface e tomate",
      price: 15.9,
    },
    {
      id: "item-2",
      name: "X-Bacon",
      description: "Hambúrguer com queijo, bacon, alface e tomate",
      price: 18.9,
    },
    {
      id: "item-3",
      name: "X-Salada",
      description: "Hambúrguer com queijo, alface, tomate, cebola e picles",
      price: 16.9,
    },
    {
      id: "item-4",
      name: "Batata Frita",
      description: "Porção de batata frita crocante",
      price: 8.9,
    },
    {
      id: "item-5",
      name: "Refrigerante",
      description: "Lata 350ml",
      price: 5.0,
    },
    {
      id: "item-6",
      name: "Milk Shake",
      description: "Milk shake de chocolate, morango ou baunilha",
      price: 12.9,
    },
  ]
}

export function getMockOrders(): Order[] {
  return [
    {
      id: "order-1234",
      customerName: "João Silva",
      items: [
        {
          menuItemId: "item-1",
          name: "X-Burger",
          price: 15.9,
          quantity: 2,
        },
        {
          menuItemId: "item-4",
          name: "Batata Frita",
          price: 8.9,
          quantity: 1,
        },
        {
          menuItemId: "item-5",
          name: "Refrigerante",
          price: 5.0,
          quantity: 2,
        },
      ],
      total: 50.7,
      status: "completed",
      createdAt: "2023-06-15T14:30:00Z",
    },
    {
      id: "order-5678",
      customerName: "Maria Oliveira",
      items: [
        {
          menuItemId: "item-3",
          name: "X-Salada",
          price: 16.9,
          quantity: 1,
        },
        {
          menuItemId: "item-6",
          name: "Milk Shake",
          price: 12.9,
          quantity: 1,
        },
      ],
      total: 29.8,
      status: "pending",
      createdAt: "2023-06-15T15:45:00Z",
    },
    {
      id: "order-9012",
      customerName: "Pedro Santos",
      items: [
        {
          menuItemId: "item-2",
          name: "X-Bacon",
          price: 18.9,
          quantity: 2,
        },
        {
          menuItemId: "item-4",
          name: "Batata Frita",
          price: 8.9,
          quantity: 2,
        },
        {
          menuItemId: "item-5",
          name: "Refrigerante",
          price: 5.0,
          quantity: 2,
        },
      ],
      total: 65.6,
      status: "pending",
      createdAt: "2023-06-15T16:20:00Z",
    },
    {
      id: "order-3456",
      customerName: "Ana Souza",
      items: [
        {
          menuItemId: "item-1",
          name: "X-Burger",
          price: 15.9,
          quantity: 1,
        },
        {
          menuItemId: "item-5",
          name: "Refrigerante",
          price: 5.0,
          quantity: 1,
        },
      ],
      total: 20.9,
      status: "completed",
      createdAt: "2023-06-15T13:10:00Z",
    },
    {
      id: "order-7890",
      customerName: "Carlos Ferreira",
      items: [
        {
          menuItemId: "item-3",
          name: "X-Salada",
          price: 16.9,
          quantity: 1,
        },
        {
          menuItemId: "item-2",
          name: "X-Bacon",
          price: 18.9,
          quantity: 1,
        },
        {
          menuItemId: "item-4",
          name: "Batata Frita",
          price: 8.9,
          quantity: 1,
        },
        {
          menuItemId: "item-6",
          name: "Milk Shake",
          price: 12.9,
          quantity: 2,
        },
      ],
      total: 70.5,
      status: "pending",
      createdAt: "2023-06-15T17:05:00Z",
    },
  ]
}

