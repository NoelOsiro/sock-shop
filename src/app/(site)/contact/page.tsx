import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sock Shop',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="mb-6">Have a question or comment? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Your email" />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Your message" />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  )
}