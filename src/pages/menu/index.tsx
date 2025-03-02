"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Trash2, Utensils } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getMockMenuItems } from "@/lib/data"
import type { MenuItem } from "@/lib/types"

export default function MenuPage() {
  const { toast } = useToast()
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getMockMenuItems())
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !description || !price) {
      toast({
        title: "Erro ao cadastrar item",
        description: "Preencha todos os campos",
        variant: "destructive",
      })
      return
    }

    const priceValue = Number.parseFloat(price)
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Erro ao cadastrar item",
        description: "O preço deve ser um número positivo",
        variant: "destructive",
      })
      return
    }

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name,
      description,
      price: priceValue,
    }

    setMenuItems([...menuItems, newItem])
    setName("")
    setDescription("")
    setPrice("")

    toast({
      title: "Item cadastrado com sucesso",
      description: `${name} foi adicionado ao cardápio`,
    })
  }

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
    toast({
      title: "Item removido",
      description: "Item removido do cardápio",
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Utensils className="h-6 w-6" />
          <span className="hidden md:inline-block">Lanchonete App</span>
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
              <CardTitle>Cadastrar Item no Cardápio</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: X-Burger" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Hambúrguer com queijo, alface e tomate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 15.90"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itens do Cardápio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menuItems.length === 0 ? (
                  <p className="text-center text-muted-foreground">Nenhum item cadastrado</p>
                ) : (
                  menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-sm font-medium">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

