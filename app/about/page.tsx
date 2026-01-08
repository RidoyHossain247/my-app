import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ContainerBox } from "@/components/ui/container-box"

export default function AboutPage() {
  return (
    <ContainerBox maxWidth="lg" className="py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-muted-foreground">
            Welcome to our website! We are dedicated to providing the best
            experience for our users.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              What drives us forward
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to create innovative solutions that make a
              difference. We believe in quality, integrity, and customer
              satisfaction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>
              Years of dedication and growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              With years of experience in the industry, we have built a team of
              experts who are passionate about what they do. We continuously work
              to improve and deliver excellence in everything we do.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
            <CardDescription>
              The principles that guide us
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Commitment to excellence</li>
              <li>Customer-first approach</li>
              <li>Innovation and creativity</li>
              <li>Transparency and honesty</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ContainerBox>
  )
}

