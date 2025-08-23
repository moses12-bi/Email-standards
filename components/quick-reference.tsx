import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function QuickReference() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-lg font-semibold">Quick Reference</h2>
        <p className="text-sm text-muted-foreground">Essential codes and guidelines</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Department Codes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Risk Management</span>
            <Badge variant="outline" className="text-xs">
              RISK
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Compliance</span>
            <Badge variant="outline" className="text-xs">
              COMP
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Product Dev</span>
            <Badge variant="outline" className="text-xs">
              PROD
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Customer Ops</span>
            <Badge variant="outline" className="text-xs">
              CUST
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Finance</span>
            <Badge variant="outline" className="text-xs">
              FINC
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Technology</span>
            <Badge variant="outline" className="text-xs">
              TECH
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Product Codes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Payment Gateway</span>
            <Badge variant="outline" className="text-xs">
              GWAY
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Digital Wallet</span>
            <Badge variant="outline" className="text-xs">
              WALT
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Card Services</span>
            <Badge variant="outline" className="text-xs">
              CARD
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Credit Services</span>
            <Badge variant="outline" className="text-xs">
              CRED
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>All Products</span>
            <Badge variant="outline" className="text-xs">
              ALL
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Action Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Need Action</span>
            <Badge variant="outline" className="text-xs">
              ACTION
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Need Decision</span>
            <Badge variant="outline" className="text-xs">
              DECISION
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Need Review</span>
            <Badge variant="outline" className="text-xs">
              REVIEW
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Need Approval</span>
            <Badge variant="outline" className="text-xs">
              APPROVAL
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Meeting Request</span>
            <Badge variant="outline" className="text-xs">
              MEETING
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Information Only</span>
            <Badge variant="outline" className="text-xs">
              INFO
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Urgency Levels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Same day response</span>
            <Badge variant="destructive" className="text-xs">
              URGENT
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>1-2 days response</span>
            <Badge variant="secondary" className="text-xs">
              HIGH
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Lower priority</span>
            <Badge variant="outline" className="text-xs">
              LOW
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-2">
        <h3 className="font-medium text-sm">Format Structure</h3>
        <code className="block rounded bg-muted p-2 text-xs">
          CTK-[DEPT]-[PRODUCT]
          <br />- [Subject] - [ACTION]
          <br />- [URGENCY]
        </code>
        <p className="text-xs text-muted-foreground">Maximum 78 characters total</p>
      </div>
    </div>
  )
}
