"use client"
import { Button } from "@/components/ui/button"

interface DonationFormProps {
  amount: number
}

export function DonationForm({ amount }: DonationFormProps) {
  //const stripe = useStripe()
  //const elements = useElements()
  //const [isLoading, setIsLoading] = useState(false)

  //const handleSubmit = async (event: React.FormEvent) => {
  //  event.preventDefault()

  //  if (!stripe || !elements) {
  //    return
  //  }

  //  setIsLoading(true)

  //  try {
  //    const { error: backendError, clientSecret } = await fetch("/api/create-payment-intent", {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //      body: JSON.stringify({
  //        amount: amount * 100, // Convert to cents
  //      }),
  //    }).then((res) => res.json())

  //    if (backendError) {
  //      toast({
  //        title: "Error",
  //        description: backendError.message,
  //        variant: "destructive",
  //      })
  //      return
  //    }

  //    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //      payment_method: {
  //        card: elements.getElement(CardElement)!,
  //      },
  //    })

  //    if (stripeError) {
  //      toast({
  //        title: "Error",
  //        description: stripeError.message,
  //        variant: "destructive",
  //      })
  //    } else if (paymentIntent.status === "succeeded") {
  //      toast({
  //        title: "Success",
  //        description: `Thank you for your $${amount} donation!`,
  //      })
  //    }
  //  } catch (error) {
  //    console.error("Error:", error)
  //    toast({
  //      title: "Error",
  //      description: "An unexpected error occurred.",
  //      variant: "destructive",
  //    })
  //  } finally {
  //    setIsLoading(false)
  //  }
  //}

  return (
    <div className="space-y-4">
      <p className="text-center text-gray-600 dark:text-gray-300">
        Our donation system is currently being set up. Thank you for your patience!
      </p>
      <Button disabled className="w-full">
        Donate ${amount.toFixed(2)}
      </Button>
    </div>
  )
}
