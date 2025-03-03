"use client"

import { useState } from "react"
import { ArrowLeft, Minus, Plus, ShoppingCart, Utensils } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getMockMenuItems } from "@/lib/data"
import type { MenuItem, OrderItem } from "@/lib/types"
import Image from "next/image"

export default function OrdersPage() {
  const { toast } = useToast()
  const menuItems = getMockMenuItems()
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [customerName, setCustomerName] = useState("")

  const addToOrder = (menuItem: MenuItem) => {
    const existingItem = orderItems.find((item) => item.menuItemId === menuItem.id)

    if (existingItem) {
      setOrderItems(
        orderItems.map((item) => (item.menuItemId === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setOrderItems([
        ...orderItems,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ])
    }
  }

  const decreaseQuantity = (menuItemId: string) => {
    const existingItem = orderItems.find((item) => item.menuItemId === menuItemId)

    if (existingItem && existingItem.quantity > 1) {
      setOrderItems(
        orderItems.map((item) => (item.menuItemId === menuItemId ? { ...item, quantity: item.quantity - 1 } : item)),
      )
    } else {
      setOrderItems(orderItems.filter((item) => item.menuItemId !== menuItemId))
    }
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmitOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Erro ao criar pedido",
        description: "Adicione pelo menos um item ao pedido",
        variant: "destructive",
      })
      return
    }

    if (!customerName.trim()) {
      toast({
        title: "Erro ao criar pedido",
        description: "Informe o nome do cliente",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the order to an API
    toast({
      title: "Pedido criado com sucesso",
      description: `Pedido para ${customerName} foi registrado`,
    })

    // Reset form
    setOrderItems([])
    setCustomerName("")
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b  bg-rose-600 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="marca/icone.svg" width={50} height={50} alt="big-boca"/>
        </Link>
        <nav className="ml-auto flex gap-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cardápio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-sm font-medium">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => addToOrder(item)}>
                      <Plus className="mr-1 h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Novo Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Nome do Cliente</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: João Silva"
                  />
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Itens do Pedido</h3>
                  {orderItems.length === 0 ? (
                    <p className="text-center text-muted-foreground">Nenhum item adicionado</p>
                  ) : (
                    <div className="space-y-2">
                      {orderItems.map((item) => (
                        <div key={item.menuItemId} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm">
                              R$ {item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => decreaseQuantity(item.menuItemId)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => addToOrder(menuItems.find((mi) => mi.id === item.menuItemId)!)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-lg font-bold">R$ {calculateTotal().toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleSubmitOrder} disabled={orderItems.length === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Finalizar Pedido
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

