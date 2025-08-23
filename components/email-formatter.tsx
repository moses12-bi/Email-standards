"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, CheckCircle, Sparkles, AlertTriangle, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const departments = [
  { code: "RISK", name: "Risk Management", description: "Risk alerts, policy updates" },
  { code: "COMP", name: "Compliance", description: "Regulatory submissions, audits" },
  { code: "PROD", name: "Product Development", description: "Feature releases, tech updates" },
  { code: "CUST", name: "Customer Operations", description: "Support escalations, KYC" },
  { code: "FINC", name: "Finance", description: "Budget reviews, financial reports" },
  { code: "LEGAL", name: "Legal Affairs", description: "Contract reviews, regulatory" },
  { code: "TECH", name: "Technology", description: "System maintenance, security" },
  { code: "MARK", name: "Marketing", description: "Campaign updates, brand guidelines" },
  { code: "COMM", name: "Commercial", description: "Sales updates, partnerships" },
  { code: "HR", name: "Human Resources", description: "Recruitment, employee relations" },
  { code: "CEO", name: "CEO Office", description: "Executive decisions, strategic" },
  { code: "EXEC", name: "Executive Team", description: "C-suite collaboration" },
  { code: "GEN", name: "General/Cross-Dept", description: "Company-wide communications" },
]

const products = [
  { code: "GWAY", name: "Payment Gateway", description: "Payment processing system" },
  { code: "WALT", name: "Digital Wallet", description: "Mobile wallet application" },
  { code: "CARD", name: "Card Services", description: "Credit/debit card services" },
  { code: "CRED", name: "Credit Services", description: "Lending and credit products" },
  { code: "TRANS", name: "Transport (SafariBus)", description: "Bus ticketing system" },
  { code: "EVENT", name: "Event Ticketing", description: "TiCQet event platform" },
  { code: "ALL", name: "Company-wide/Multiple", description: "All products or general" },
]

const actionTypes = [
  { code: "ACTION", description: "Need specific action/response" },
  { code: "DECISION", description: "Requires decision/approval" },
  { code: "REVIEW", description: "Need review/feedback" },
  { code: "APPROVAL", description: "Requires authorization" },
  { code: "MEETING", description: "Meeting request/scheduling" },
  { code: "INFO", description: "Informational only" },
]

const urgencyLevels = [
  { code: "URGENT", description: "Immediate action required (same day)" },
  { code: "HIGH", description: "Important, needs attention (1-2 days)" },
  { code: "LOW", description: "Can wait, lower priority" },
]

export function EmailFormatter() {
  const [emailType, setEmailType] = useState<"internal" | "external" | "inbound">("internal")
  const [department, setDepartment] = useState("GEN")
  const [product, setProduct] = useState("ALL")
  const [subject, setSubject] = useState("")
  const [actionType, setActionType] = useState("INFO")
  const [urgency, setUrgency] = useState("")
  const [externalParty, setExternalParty] = useState("")
  const [justCopied, setJustCopied] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { toast } = useToast()

  const generateSubjectLine = () => {
    let prefix = "CTK-"

    if (emailType === "internal") {
      prefix += department
    } else if (emailType === "external") {
      prefix += `EXT-${externalParty.toUpperCase().replace(/\s+/g, "")}`
    } else {
      prefix += `IN-${externalParty.toUpperCase().replace(/\s+/g, "")}`
    }

    prefix += `-${product}`

    let subjectLine = `${prefix} - ${subject} - ${actionType}`

    if (urgency) {
      subjectLine += ` - ${urgency}`
    }

    return subjectLine
  }

  const copyToClipboard = async () => {
    const subjectLine = generateSubjectLine()
    try {
      await navigator.clipboard.writeText(subjectLine)
      setJustCopied(true)
      setIsAnimating(true)

      setTimeout(() => {
        setJustCopied(false)
        setIsAnimating(false)
      }, 2500)

      toast({
        title: "✅ Copied successfully!",
        description: "Email subject line is ready to paste in your email client.",
        duration: 3000,
      })
    } catch (err) {
      toast({
        title: "❌ Copy failed",
        description: "Please try selecting and copying manually.",
        variant: "destructive",
      })
    }
  }

  const reset = () => {
    setIsAnimating(true)
    setDepartment("GEN")
    setProduct("ALL")
    setSubject("")
    setActionType("INFO")
    setUrgency("")
    setExternalParty("")
    setTimeout(() => setIsAnimating(false), 300)
  }

  const subjectLine = generateSubjectLine()
  const isValid =
    department &&
    product &&
    subject &&
    actionType &&
    (emailType === "internal" || (emailType !== "internal" && externalParty))
  const characterCount = subjectLine.length
  const isOverLimit = characterCount > 78

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-serif text-2xl">Email Subject Line Generator</CardTitle>
              <CardDescription className="text-base mt-1">
                Create properly formatted email subjects following Centrika standards
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Email Type
            </Label>
            <Select
              value={emailType}
              onValueChange={(value: "internal" | "external" | "inbound") => {
                setEmailType(value)
                setExternalParty("")
              }}
            >
              <SelectTrigger className="h-12 bg-background/50 border-2 hover:border-primary/50 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal" className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <div>
                      <div className="font-medium">Internal</div>
                      <div className="text-xs text-muted-foreground">Between Centrika employees</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="external" className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    <div>
                      <div className="font-medium">External</div>
                      <div className="text-xs text-muted-foreground">To customers, partners, regulators</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="inbound" className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-orange-500 rounded-full" />
                    <div>
                      <div className="font-medium">Inbound</div>
                      <div className="text-xs text-muted-foreground">Renaming received emails</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(emailType === "external" || emailType === "inbound") && (
            <div className="space-y-3 animate-slide-in">
              <Label className="text-sm font-medium">External Party *</Label>
              <Input
                placeholder="e.g., BNR, BankOfKigali, CustomerName"
                value={externalParty}
                onChange={(e) => setExternalParty(e.target.value)}
                className="h-12 bg-background/50 border-2 hover:border-primary/50 focus:border-primary transition-colors"
              />
              {externalParty && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Will appear as: {emailType === "external" ? "EXT-" : "IN-"}
                  {externalParty.toUpperCase().replace(/\s+/g, "")}
                </p>
              )}
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-sm font-medium">Department *</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="h-12 bg-background/50 border-2 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {departments.map((dept) => (
                  <SelectItem key={dept.code} value={dept.code} className="py-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs">
                        {dept.code}
                      </Badge>
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-xs text-muted-foreground">{dept.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Product/Service *</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="h-12 bg-background/50 border-2 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Select product or service" />
              </SelectTrigger>
              <SelectContent>
                {products.map((prod) => (
                  <SelectItem key={prod.code} value={prod.code} className="py-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs">
                        {prod.code}
                      </Badge>
                      <div>
                        <div className="font-medium">{prod.name}</div>
                        <div className="text-xs text-muted-foreground">{prod.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Subject Description *</Label>
            <Input
              placeholder="Brief, clear description of the email topic"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-12 bg-background/50 border-2 hover:border-primary/50 focus:border-primary transition-colors"
            />
            {subject && <p className="text-xs text-muted-foreground">{subject.length} characters</p>}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Action Type *</Label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger className="h-12 bg-background/50 border-2 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="What action is expected?" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((action) => (
                  <SelectItem key={action.code} value={action.code} className="py-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs">
                        {action.code}
                      </Badge>
                      <div>
                        <div className="font-medium">{action.code}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Urgency Level (Optional)</Label>
              {urgency && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUrgency("")}
                  className="h-8 px-3 text-xs hover:bg-destructive/10 hover:text-destructive"
                >
                  Clear urgency
                </Button>
              )}
            </div>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger className="h-12 bg-background/50 border-2 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Select urgency if needed" />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map((level) => (
                  <SelectItem key={level.code} value={level.code} className="py-3">
                    <div className="flex items-start gap-3">
                      <Badge
                        variant={
                          level.code === "URGENT" ? "destructive" : level.code === "HIGH" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {level.code}
                      </Badge>
                      <div>
                        <div className="font-medium">{level.code}</div>
                        <div className="text-xs text-muted-foreground">{level.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`shadow-xl transition-all duration-500 ${
          isValid ? "ring-2 ring-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5" : "bg-muted/30"
        } ${isAnimating ? "scale-[0.98]" : "scale-100"}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${isValid ? "bg-primary/10" : "bg-muted"}`}>
                <Mail className={`h-5 w-5 ${isValid ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div>
                <CardTitle className="font-serif text-xl">Generated Subject Line</CardTitle>
                <CardDescription className="mt-1">
                  {isValid
                    ? "Ready to copy to your email client"
                    : "Complete the required fields above to generate your subject line"}
                </CardDescription>
              </div>
            </div>
            {isValid && (
              <div className="flex items-center gap-2">
                <Badge variant={isOverLimit ? "destructive" : "secondary"} className="text-xs">
                  {characterCount}/78
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`group relative rounded-xl border-2 p-6 transition-all duration-300 cursor-pointer ${
              isValid
                ? "bg-background/80 border-primary/20 hover:border-primary/40 hover:bg-background/90 hover:shadow-lg"
                : "bg-muted/50 border-muted cursor-not-allowed"
            }`}
            onClick={isValid ? copyToClipboard : undefined}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <code
                  className={`text-sm font-mono break-all leading-relaxed ${
                    isValid ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {isValid ? subjectLine : "Please fill in all required fields..."}
                </code>
                {isValid && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <Copy className="h-3 w-3" />
                    <span>Click anywhere to copy</span>
                  </div>
                )}
              </div>
              {isValid && (
                <div className="flex-shrink-0">
                  <div
                    className={`p-2 rounded-lg transition-all ${
                      justCopied ? "bg-green-100 dark:bg-green-950/20" : "bg-primary/10 group-hover:bg-primary/20"
                    }`}
                  >
                    {justCopied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {isValid && isOverLimit && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg animate-slide-in">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">Subject line too long</p>
                <p className="text-xs text-destructive/80 mt-1">
                  Consider shortening the subject description to stay within the 78-character limit
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              {isValid && !isOverLimit && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Ready to copy</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors bg-transparent"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                size={isValid ? "default" : "sm"}
                onClick={copyToClipboard}
                disabled={!isValid}
                variant={justCopied ? "secondary" : "default"}
                className={`transition-all duration-300 ${
                  isValid ? "font-medium px-6 shadow-lg hover:shadow-xl" : ""
                } ${justCopied ? "bg-green-600 hover:bg-green-700" : ""}`}
              >
                {justCopied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    {isValid ? "Copy Subject Line" : "Copy"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
