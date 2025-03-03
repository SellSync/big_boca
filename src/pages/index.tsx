import { DollarSign, ShoppingBag, Utensils } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderCard } from "@/components/order-card"
import { StatsCard } from "@/components/stats-card"
import { getMockOrders } from "@/lib/data"
import Image from "next/image"

export default function Dashboard() {
  const orders = getMockOrders()

  // Calculate stats
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b  bg-rose-600 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="marca/icone.svg" width={50} height={50} alt="big-boca"/>
        </Link>
        <nav className="ml-auto flex gap-2">
          <Link href="/menu">
            <Button variant="outline" size="sm">
              Cardápio
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline" size="sm">
              Novo Pedido
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Pedidos Totais"
            value={totalOrders}
            icon={ShoppingBag}
            description="Total de pedidos realizados"
          />
          <StatsCard
            title="Receita Total"
            value={`R$ ${totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            description="Valor total dos pedidos"
          />
          <StatsCard
            title="Pedidos Pendentes"
            value={pendingOrders}
            icon={ShoppingBag}
            description="Pedidos aguardando preparo"
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold tracking-tight">Pedidos</h2>
            <TabsList className="ml-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="completed">Concluídos</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {orders
                .filter((order) => order.status === "pending")
                .map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {orders
                .filter((order) => order.status === "completed")
                .map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

