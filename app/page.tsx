"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Copy, Check, Sparkles, Info, CheckCircle, HelpCircle } from "lucide-react"
import { toast } from "sonner"

export default function HomePage() {
  const [emailType, setEmailType] = useState("")
  const [department, setDepartment] = useState("")
  const [position, setPosition] = useState("")
  const [service, setService] = useState("")
  const [product, setProduct] = useState("")
  const [subject, setSubject] = useState("")
  const [action, setAction] = useState("")
  const [urgency, setUrgency] = useState("")
  const [copied, setCopied] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const departmentSections = [
    "Executive",
    "Management",
    "Operations",
    "Technology",
    "Finance",
    "Risk",
    "Business",
    "Support",
  ]

  const externalPartyTypes = ["Customer", "Partner", "Regulator", "Vendor", "Investor", "Media", "Legal", "Auditor"]

  const departments = [
    // Executive Level
    { code: "CEO", name: "Chief Executive Office", section: "Executive" },
    { code: "CFO", name: "Chief Financial Office", section: "Executive" },
    { code: "CTO", name: "Chief Technology Office", section: "Executive" },
    { code: "COO", name: "Chief Operations Office", section: "Executive" },
    { code: "CRO", name: "Chief Risk Office", section: "Executive" },

    // Management Level
    { code: "MGT", name: "Management", section: "Management" },
    { code: "HOD", name: "Head of Department", section: "Management" },
    { code: "TLM", name: "Team Lead/Manager", section: "Management" },

    // Operations
    { code: "OPS", name: "Operations", section: "Operations" },
    { code: "CUS", name: "Customer Service", section: "Operations" },
    { code: "SUP", name: "Support Services", section: "Operations" },
    { code: "PRO", name: "Processing", section: "Operations" },

    // Technology
    { code: "DEV", name: "Development", section: "Technology" },
    { code: "INF", name: "Infrastructure", section: "Technology" },
    { code: "SEC", name: "Security", section: "Technology" },
    { code: "QAS", name: "Quality Assurance", section: "Technology" },

    // Finance & Risk
    { code: "FIN", name: "Finance", section: "Finance" },
    { code: "ACC", name: "Accounting", section: "Finance" },
    { code: "RIS", name: "Risk Management", section: "Risk" },
    { code: "AUD", name: "Audit", section: "Risk" },
    { code: "COM", name: "Compliance", section: "Risk" },

    // Business Units
    { code: "BUS", name: "Business Development", section: "Business" },
    { code: "MKT", name: "Marketing", section: "Business" },
    { code: "SAL", name: "Sales", section: "Business" },
    { code: "PRD", name: "Product Management", section: "Business" },

    // Support Functions
    { code: "HR", name: "Human Resources", section: "Support" },
    { code: "LEG", name: "Legal", section: "Support" },
    { code: "ADM", name: "Administration", section: "Support" },
    { code: "FAC", name: "Facilities", section: "Support" },
  ]

  const externalParties = [
    // Customer
    { code: "CUST", name: "Individual Customer", section: "Customer" },
    { code: "MERCH", name: "Merchant", section: "Customer" },
    { code: "CORP", name: "Corporate Client", section: "Customer" },

    // Partner
    { code: "BANK", name: "Banking Partner", section: "Partner" },
    { code: "TECH", name: "Technology Partner", section: "Partner" },
    { code: "INTEG", name: "Integration Partner", section: "Partner" },

    // Regulator
    { code: "BNR", name: "Central Bank of Rwanda", section: "Regulator" },
    { code: "MINICT", name: "Ministry of ICT", section: "Regulator" },
    { code: "RDB", name: "Rwanda Development Board", section: "Regulator" },

    // Vendor
    { code: "VENDOR", name: "Service Vendor", section: "Vendor" },
    { code: "CONSUL", name: "Consultant", section: "Vendor" },
    { code: "SUPP", name: "Supplier", section: "Vendor" },

    // Investor
    { code: "VC", name: "Venture Capital", section: "Investor" },
    { code: "PE", name: "Private Equity", section: "Investor" },
    { code: "ANGEL", name: "Angel Investor", section: "Investor" },

    // Media
    { code: "MEDIA", name: "Media Outlet", section: "Media" },
    { code: "PRESS", name: "Press/Journalist", section: "Media" },

    // Legal
    { code: "LAW", name: "Law Firm", section: "Legal" },
    { code: "LEGAL", name: "Legal Counsel", section: "Legal" },

    // Auditor
    { code: "AUDIT", name: "External Auditor", section: "Auditor" },
    { code: "CONSULT", name: "Audit Consultant", section: "Auditor" },
  ]

  const serviceCategories = ["Payments", "Digital", "Credit", "Corporate", "General"]

  const products = [
    // Payment Services
    { code: "INTERSWITCH", name: "Interswitch Services", category: "Payments" },
    { code: "XENTRIPAY", name: "XentriPay Platform", category: "Payments" },
    { code: "CARDS", name: "Card Services", category: "Payments" },
    { code: "TRANSFER", name: "Money Transfer", category: "Payments" },

    // Digital Banking
    { code: "MOBILE", name: "Mobile Banking", category: "Digital" },
    { code: "INTERNET", name: "Internet Banking", category: "Digital" },
    { code: "API", name: "API Services", category: "Digital" },
    { code: "WALLET", name: "Digital Wallet", category: "Digital" },

    // Lending & Credit
    { code: "LOANS", name: "Loan Services", category: "Credit" },
    { code: "CREDIT", name: "Credit Facilities", category: "Credit" },
    { code: "MORTGAGE", name: "Mortgage Services", category: "Credit" },

    // Corporate Services
    { code: "CORP", name: "Corporate Banking", category: "Corporate" },
    { code: "TREASURY", name: "Treasury Services", category: "Corporate" },
    { code: "TRADE", name: "Trade Finance", category: "Corporate" },

    // General Services
    { code: "GENERAL", name: "General Banking", category: "General" },
    { code: "CUSTOMER", name: "Customer Services", category: "General" },
    { code: "SYSTEM", name: "System Operations", category: "General" },
  ]

  const actions = [
    "LOADING",
    "UNLOADING",
    "RECONCILIATION",
    "SETTLEMENT",
    "INVESTIGATION",
    "MAINTENANCE",
    "UPDATE",
    "NOTIFICATION",
    "REQUEST",
    "RESPONSE",
    "APPROVAL",
    "REJECTION",
  ]

  const urgencyLevels = ["HIGH", "MEDIUM", "LOW"]

  const generateSubjectLine = () => {
    const parts = ["CTK"]

    // Add EXT prefix for external emails
    if (emailType === "External" && position) {
      parts.push("EXT")
      parts.push(position)
    } else if (emailType === "Internal" && position) {
      parts.push(position)
    }

    if (product) parts.push(product)

    let subjectPart = ""
    if (subject) subjectPart += subject
    if (action) subjectPart += (subject ? " - " : "") + action
    if (urgency) subjectPart += (subject || action ? " - " : "") + urgency

    if (subjectPart) parts.push(subjectPart)

    return parts.join(" - ")
  }

  const subjectLine = generateSubjectLine()
  const isValid = emailType && position && service && product && subject

  const copyToClipboard = async () => {
    if (!isValid) return

    try {
      await navigator.clipboard.writeText(subjectLine)
      setCopied(true)
      toast.success("Subject line copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  const resetForm = () => {
    setEmailType("")
    setDepartment("")
    setPosition("")
    setService("")
    setProduct("")
    setSubject("")
    setAction("")
    setUrgency("")
    setCopied(false)
  }

  const completedSteps = [emailType, position, service, product, subject].filter(Boolean).length
  const totalRequiredSteps = 5

  const availablePositions =
    emailType === "Internal"
      ? departments.filter((dept) => dept.section === department)
      : externalParties.filter((party) => party.section === department)

  const availableProducts = products.filter((prod) => prod.category === service)

  const handleEmailTypeChange = (value: string) => {
    setEmailType(value)
    setDepartment("") // Reset department when email type changes
    setPosition("") // Reset position when email type changes
  }

  const handleDepartmentChange = (value: string) => {
    setDepartment(value)
    setPosition("") // Reset position when department changes
  }

  const handleServiceChange = (value: string) => {
    setService(value)
    setProduct("") // Reset product when service changes
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900/20 dark:to-slate-800">
      <header className="border-b bg-gradient-to-r from-indigo-700 via-amber-400 to-red-500 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/centrika-logo.svg" alt="Centrika Logo" className="h-8 w-8 rounded-lg shadow" />
              <div>
                <h1 className="text-lg font-bold text-white">Centrika Email Management</h1>
                <p className="text-gray-100 text-xs">Professional Email Standards & Composition</p>
              </div>
            </div>

            {/* Help Button */}
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 backdrop-blur-sm transition-all text-sm px-3 py-1.5"
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Help
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Info className="h-5 w-5 text-blue-600 hover" />
                    How to Use the Email Subject Generator
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Step-by-Step Guide</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-violet-800 dark:text-violet-300">Choose Email Type</h4>
                          <p className="text-sm text-violet-700 dark:text-violet-200">
                            Select whether this is an Internal email (between Centrika employees) or External email (to
                            customers, partners, regulators, etc.).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-emerald-800 dark:text-emerald-300">
                            Select Department/Party Type
                          </h4>
                          <p className="text-sm text-emerald-700 dark:text-emerald-200">
                            For Internal: Choose your department (Executive, Management, Operations, etc.). For
                            External: Choose the party type (Customer, Partner, Regulator, etc.).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-teal-800 dark:text-teal-300">
                            Choose Position/Specific Party
                          </h4>
                          <p className="text-sm text-teal-700 dark:text-teal-200">
                            Select your specific position within the chosen department, or the specific external party
                            you're communicating with.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-blue-300">Select Service Category</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-200">
                            Choose from Payments, Digital, Credit, Corporate, or General services to categorize your
                            email topic.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          5
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-800 dark:text-purple-300">Choose Product Line</h4>
                          <p className="text-sm text-purple-700 dark:text-purple-200">
                            Select the specific product or service related to your email from the filtered list based on
                            your service category.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          6
                        </div>
                        <div>
                          <h4 className="font-medium text-indigo-800 dark:text-indigo-300">Enter Subject</h4>
                          <p className="text-sm text-indigo-700 dark:text-indigo-200">
                            Write a clear, concise description of your email topic (max 30 characters). Keep it
                            descriptive but brief.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          7
                        </div>
                        <div>
                          <h4 className="font-medium text-orange-800 dark:text-orange-300">
                            Add Action & Urgency (Optional)
                          </h4>
                          <p className="text-sm text-orange-700 dark:text-orange-200">
                            Optionally specify an action type (LOADING, RECONCILIATION, etc.) and urgency level (HIGH,
                            MEDIUM, LOW).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-3">
                      Subject Line Format
                    </h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg space-y-2">
                      <div>
                        <p className="text-sm font-medium mb-1">Internal:</p>
                        <code className="text-sm font-mono">
                          CTK - [POSITION] - [PRODUCT] - [SUBJECT] - [ACTION] - [URGENCY]
                        </code>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">External:</p>
                        <code className="text-sm font-mono">
                          CTK - EXT - [PARTY] - [PRODUCT] - [SUBJECT] - [ACTION] - [URGENCY]
                        </code>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      Example Internal:{" "}
                      <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
                        CTK - MGT - INTERSWITCH - Float balance reminder - RECONCILIATION - HIGH
                      </code>
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Example External:{" "}
                      <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
                        CTK - EXT - BNR - GENERAL - License renewal request - REQUEST - HIGH
                      </code>
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-3">
                      Tips for Best Results
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Keep subjects concise and specific
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Use urgency levels appropriately (HIGH for critical issues only)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Select the most relevant product line for better categorization
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Copy the generated subject line and paste it into your email client
                      </li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-4xl">
        <Card className="shadow-xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-slate-700 dark:to-slate-600 rounded-t-lg">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <Sparkles className="h-3 w-3 text-orange-600" />
              <span className="text-xs font-medium bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                Professional Communication
              </span>
            </div>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
              Email Subject Generator
            </CardTitle>

            <div className="mt-1.5 flex items-center justify-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: totalRequiredSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i < completedSteps
                        ? "bg-gradient-to-r from-green-500 to-teal-500"
                        : "bg-slate-200 dark:bg-slate-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-300 ml-0.5">
                {completedSteps}/{totalRequiredSteps} required
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-4">
            {/* Form Fields */}
            <div className="grid gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-gray-500 to-slate-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <Label htmlFor="emailType" className="font-medium text-sm">
                    Email Type *
                  </Label>
                  {emailType && <CheckCircle className="h-3 w-3 text-gray-500" />}
                </div>
                <Select value={emailType} onValueChange={handleEmailTypeChange}>
                  <SelectTrigger
                    className={`h-9 transition-all ${emailType ? "border-gray-300 bg-gray-50/50 dark:bg-gray-900/20" : "hover:border-gray-200"}`}
                  >
                    <SelectValue placeholder="Select email type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internal">Internal (Between Centrika employees)</SelectItem>
                    <SelectItem value="External">External (To customers, partners, regulators)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <Label htmlFor="department" className="font-medium text-sm">
                      {emailType === "Internal" ? "Department" : "Party Type"} *
                    </Label>
                    {department && <CheckCircle className="h-3 w-3 text-green-500" />}
                  </div>
                  <Select value={department} onValueChange={handleDepartmentChange} disabled={!emailType}>
                    <SelectTrigger
                      className={`h-9 transition-all ${department ? "border-green-300 bg-green-50/50 dark:bg-green-900/20" : "hover:border-green-200"} ${!emailType ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <SelectValue
                        placeholder={
                          emailType
                            ? emailType === "Internal"
                              ? "Select department"
                              : "Select party type"
                            : "Select email type first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {emailType === "Internal"
                        ? departmentSections.map((section) => (
                            <SelectItem key={section} value={section}>
                              {section}
                            </SelectItem>
                          ))
                        : externalPartyTypes.map((partyType) => (
                            <SelectItem key={partyType} value={partyType}>
                              {partyType}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <Label htmlFor="position" className="font-medium text-sm">
                      {emailType === "Internal" ? "Position" : "Specific Party"} *
                    </Label>
                    {position && <CheckCircle className="h-3 w-3 text-orange-500" />}
                  </div>
                  <Select value={position} onValueChange={setPosition} disabled={!department}>
                    <SelectTrigger
                      className={`h-9 transition-all ${position ? "border-orange-300 bg-orange-50/50 dark:bg-orange-900/20" : "hover:border-orange-200"} ${!department ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <SelectValue
                        placeholder={
                          department
                            ? emailType === "Internal"
                              ? "Select position"
                              : "Select specific party"
                            : "Select department/party first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePositions.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.code} - {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <Label htmlFor="service" className="font-medium text-sm">
                      Service Category *
                    </Label>
                    {service && <CheckCircle className="h-3 w-3 text-slate-500" />}
                  </div>
                  <Select value={service} onValueChange={handleServiceChange}>
                    <SelectTrigger
                      className={`h-9 transition-all ${service ? "border-slate-300 bg-slate-50/50 dark:bg-slate-900/20" : "hover:border-slate-200"}`}
                    >
                      <SelectValue placeholder="Select service category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-zinc-500 to-zinc-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      5
                    </div>
                    <Label htmlFor="product" className="font-medium text-sm">
                      Product Line *
                    </Label>
                    {product && <CheckCircle className="h-3 w-3 text-zinc-500" />}
                  </div>
                  <Select value={product} onValueChange={setProduct} disabled={!service}>
                    <SelectTrigger
                      className={`h-9 transition-all ${product ? "border-zinc-300 bg-zinc-50/50 dark:bg-zinc-900/20" : "hover:border-zinc-200"} ${!service ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <SelectValue placeholder={service ? "Select product line" : "Select service first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((prod) => (
                        <SelectItem key={prod.code} value={prod.code}>
                          {prod.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    6
                  </div>
                  <Label htmlFor="subject" className="font-medium text-sm">
                    Subject *
                  </Label>
                  {subject && <CheckCircle className="h-3 w-3 text-teal-500" />}
                </div>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Float balance reminder"
                  maxLength={30}
                  className={`h-9 transition-all ${subject ? "border-teal-300 bg-teal-50/50 dark:bg-teal-900/20" : "hover:border-teal-200"}`}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500">Keep it concise</p>
                  <p className={`text-xs ${subject.length > 25 ? "text-orange-500" : "text-slate-500"}`}>
                    {subject.length}/30
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    7
                  </div>
                  <Label className="font-medium text-sm text-red-700 dark:text-red-300">Optional</Label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="action" className="text-xs">
                      Action Type
                    </Label>
                    <Select value={action} onValueChange={setAction}>
                      <SelectTrigger
                        className={`h-9 transition-all ${action ? "border-red-300 bg-red-50/50 dark:bg-red-900/20" : "hover:border-red-200"}`}
                      >
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {actions.map((act) => (
                          <SelectItem key={act} value={act}>
                            {act}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="urgency" className="text-xs">
                      Urgency Level
                    </Label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger
                        className={`h-9 transition-all ${urgency ? "border-red-300 bg-red-50/50 dark:bg-red-900/20" : "hover:border-red-200"}`}
                      >
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            <span
                              className={`font-medium ${
                                level === "HIGH"
                                  ? "text-red-600"
                                  : level === "MEDIUM"
                                    ? "text-orange-600"
                                    : "text-green-600"
                              }`}
                            >
                              {level}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {subjectLine && subjectLine !== "CTK" && (
              <div className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-slate-800 dark:to-gray-900/20 rounded-lg border-2 border-slate-200 dark:border-slate-600">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="h-3 w-3 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-300">
                    Generated Subject Line
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-700 p-2 rounded border border-slate-200 dark:border-slate-600">
                  <code className="text-sm font-mono text-slate-800 dark:text-slate-200 break-all">{subjectLine}</code>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                onClick={copyToClipboard}
                disabled={!isValid}
                className="flex-1 h-10 bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white shadow-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Subject Line
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className="h-10 px-4 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all bg-transparent"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
