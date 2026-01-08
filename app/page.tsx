import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContainerBox } from "@/components/ui/container-box";
import Link from "next/link";

export default function Home() {
  return (
    <ContainerBox maxWidth="2xl" className="py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Website</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover amazing features and get in touch with us. We're here to help
          you succeed.
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Button asChild size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Feature One</CardTitle>
              <CardDescription>Discover our amazing features</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discover our amazing features that will help you achieve your
                goals faster and more efficiently.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Feature Two</CardTitle>
              <CardDescription>Experience innovative solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Experience the power of our innovative solutions designed with
                your needs in mind.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Feature Three</CardTitle>
              <CardDescription>Trusted by thousands</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join thousands of satisfied customers who trust us with their
                business needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContainerBox>
  );
}
