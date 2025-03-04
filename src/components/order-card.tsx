import { Clock, Check } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/types";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [status, setStatus] = useState(order.status);

  const statusMap = {
    pending: { label: "Pendente", icon: Clock, variant: "outline" as const },
    completed: { label: "Concluído", icon: Check, variant: "default" as const },
  };

  const handleComplete = () => {
    if (status === "pending") {
      setStatus("completed");
    }
  };

  const currentStatus = statusMap[status];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Pedido #{order.id.slice(-4)}</CardTitle>
          <Badge variant={currentStatus.variant}>
            <currentStatus.icon className="mr-1 h-3 w-3" />
            {currentStatus.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Cliente: {order.customerName}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-2 border-t">
        <div className="flex w-full justify-between">
          <span className="font-medium">Total:</span>
          <span className="font-bold">R$ {order.total.toFixed(2)}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleString()}</div>
        {status === "pending" && (
          <Button className="mt-2 w-full" onClick={handleComplete}>
            Finalizado
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
