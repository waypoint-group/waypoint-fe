"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createUser } from "@/features/onboarding/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  onboardingSchema,
  type OnboardingFormValuesType,
} from "@/features/onboarding/schema"
import { useState } from "react"

export const OnboardingCard = () => {
  const [isDisplayNameEdited, setIsDisplayNameEdited] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<OnboardingFormValuesType>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      displayName: "",
    },
  })

  const onSubmit = async (values: OnboardingFormValuesType) => {
    setSubmitError(null)

    // Only returns on failure; success redirects from the server.
    const result = await createUser(values)

    setSubmitError(result.message)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your profile</CardTitle>
        <CardDescription>
          Choose a username and display name to get started.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>

            <Input
              id="username"
              placeholder="Username"
              {...form.register("username", {
                onChange: (event) => {
                  const value = event.target.value

                  if (!isDisplayNameEdited) {
                    form.setValue("displayName", value)
                  }
                },
              })}
            />

            {form.formState.errors.username && (
              <p className="text-sm text-destructive">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="displayName">Display name</Label>

            <Input
              id="displayName"
              placeholder="Display name"
              {...form.register("displayName", {
                onChange: () => {
                  setIsDisplayNameEdited(true)
                },
              })}
            />

            {form.formState.errors.displayName && (
              <p className="text-sm text-destructive">
                {form.formState.errors.displayName.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating profile..." : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
