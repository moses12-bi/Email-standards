"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Mail, Shield, Clock, Send, Key, Building2 } from "lucide-react"

interface EmailComposerProps {
  userRole: "admin" | "manager" | "user"
  generatedSubject?: string
}

interface EmailData {
  to: string[]
  cc: string[]
  bcc: string[]
  subject: string
  body: string
  priority: "low" | "normal" | "high"
  emailType: "internal" | "external" | "confidential"
}

export default function EmailComposer({ userRole, generatedSubject = "" }: EmailComposerProps) {
  const [emailData, setEmailData] = useState<EmailData>({
    to: [],
    cc: [],
    bcc: [],
    subject: generatedSubject,
    body: "",
    priority: "normal",
    emailType: "internal",
  })

  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentRecipient, setCurrentRecipient] = useState("")

  const canSendExternal = userRole === "admin" || userRole === "manager"
  const canSendConfidential = userRole === "admin"

  const addRecipient = (type: "to" | "cc" | "bcc") => {
    if (currentRecipient && currentRecipient.includes("@")) {
      setEmailData((prev) => ({
        ...prev,
        [type]: [...prev[type], currentRecipient],
      }))
      setCurrentRecipient("")
    }
  }

  const removeRecipient = (type: "to" | "cc" | "bcc", email: string) => {
    setEmailData((prev) => ({
      ...prev,
      [type]: prev[type].filter((e) => e !== email),
    }))
  }

  const requestOTP = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@centrika.com" }),
      })

      if (response.ok) {
        setOtpSent(true)
        toast.success("OTP sent to your registered email!")
      } else {
        toast.error("Failed to send OTP")
      }
    } catch (error) {
      toast.error("Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const sendEmail = async () => {
    if (!otp) {
      toast.error("Please enter the OTP")
      return
    }

    if (emailData.to.length === 0) {
      toast.error("Please add at least one recipient")
      return
    }

    if (!emailData.subject || !emailData.body) {
      toast.error("Please fill in subject and body")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/emails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          OTP: otp,
        },
        body: JSON.stringify(emailData),
      })

      if (response.ok) {
        // Reset form
        setEmailData({
          to: [],
          cc: [],
          bcc: [],
          subject: "",
          body: "",
          priority: "normal",
          emailType: "internal",
        })
        setOtp("")
        setOtpSent(false)

        toast.success("Email sent successfully!")
      } else {
        toast.error("Failed to send email")
      }
    } catch (error) {
      toast.error("Failed to send email")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Mail className="h-8 w-8" />
            Centrika Email Composer
            <Badge variant="secondary" className="bg-white/20 text-white">
              {userRole.toUpperCase()}
            </Badge>
          </CardTitle>
          <p className="text-blue-100">Secure email composition with OTP verification and role-based permissions</p>
        </CardHeader>
      </Card>

      {/* Email Composition Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Compose Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Type & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email Type</label>
              <Select
                value={emailData.emailType}
                onValueChange={(value: "internal" | "external" | "confidential") =>
                  setEmailData((prev) => ({ ...prev, emailType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external" disabled={!canSendExternal}>
                    External {!canSendExternal && "(Manager+ only)"}
                  </SelectItem>
                  <SelectItem value="confidential" disabled={!canSendConfidential}>
                    Confidential {!canSendConfidential && "(Admin only)"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select
                value={emailData.priority}
                onValueChange={(value: "low" | "normal" | "high") =>
                  setEmailData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Recipients */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Add Recipients</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address"
                  value={currentRecipient}
                  onChange={(e) => setCurrentRecipient(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addRecipient("to")}
                />
                <Button onClick={() => addRecipient("to")} variant="outline">
                  Add To
                </Button>
                <Button onClick={() => addRecipient("cc")} variant="outline">
                  Add CC
                </Button>
                <Button onClick={() => addRecipient("bcc")} variant="outline">
                  Add BCC
                </Button>
              </div>
            </div>

            {/* Display Recipients */}
            {(emailData.to.length > 0 || emailData.cc.length > 0 || emailData.bcc.length > 0) && (
              <div className="space-y-2">
                {emailData.to.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">To: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {emailData.to.map((email) => (
                        <Badge
                          key={email}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeRecipient("to", email)}
                        >
                          {email} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {emailData.cc.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">CC: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {emailData.cc.map((email) => (
                        <Badge
                          key={email}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => removeRecipient("cc", email)}
                        >
                          {email} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {emailData.bcc.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">BCC: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {emailData.bcc.map((email) => (
                        <Badge
                          key={email}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => removeRecipient("bcc", email)}
                        >
                          {email} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Subject */}
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input
              placeholder="Enter email subject (use Centrika standards)"
              value={emailData.subject}
              onChange={(e) => setEmailData((prev) => ({ ...prev, subject: e.target.value }))}
            />
            {generatedSubject && emailData.subject !== generatedSubject && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setEmailData((prev) => ({ ...prev, subject: generatedSubject }))}
                className="p-0 h-auto text-blue-600"
              >
                Use generated subject: {generatedSubject}
              </Button>
            )}
          </div>

          {/* Body */}
          <div>
            <label className="text-sm font-medium mb-2 block">Email Body</label>
            <Textarea
              placeholder="Compose your email message..."
              value={emailData.body}
              onChange={(e) => setEmailData((prev) => ({ ...prev, body: e.target.value }))}
              rows={8}
            />
          </div>
        </CardContent>
      </Card>

      {/* OTP Verification & Send */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Click below to receive an OTP for secure email sending</p>
              <Button onClick={requestOTP} disabled={isLoading} className="w-full md:w-auto">
                <Key className="h-4 w-4 mr-2" />
                {isLoading ? "Sending OTP..." : "Request OTP"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Enter OTP</label>
                <Input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={sendEmail} disabled={isLoading || !otp} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "Sending Email..." : "Send Email"}
                </Button>
                <Button variant="outline" onClick={() => setOtpSent(false)}>
                  <Clock className="h-4 w-4 mr-2" />
                  Resend OTP
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Security Notice</p>
              <p>
                All emails are logged for audit purposes. OTP verification is required for sending. Your role (
                {userRole}) determines available email types and recipients.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
