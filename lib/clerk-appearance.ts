export const authAppearance = {
  variables: {
    colorPrimary: "oklch(0.582 0.165 249.0)",
    colorBackground: "var(--background)",
    colorInputBackground: "var(--muted)",
    colorInputText: "var(--foreground)",
    colorText: "var(--foreground)",
    colorTextSecondary: "var(--muted-foreground)",
    colorNeutral: "var(--border)",
    colorDanger: "var(--destructive)",
    borderRadius: "4px",
    fontFamily: "inherit",
    fontSize: "14px",
    spacingUnit: "0.9rem",
  },
  elements: {
    cardBox: {
      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
      border: "1px solid var(--border)",
      borderRadius: "0.75rem",
      backgroundColor: "var(--background)",
    },
    card: {
      boxShadow: "none",
      border: "none",
      borderRadius: "0.75rem",
      backgroundColor: "transparent",
      padding: "2rem",
      width: "100%",
      maxWidth: "450px",
    },

    headerTitle: {
      fontSize: "1.125rem",
      fontWeight: "500",
      letterSpacing: "-0.02em",
      color: "var(--foreground)",
      textAlign: "center",
    },
    headerSubtitle: {
      color: "var(--muted-foreground)",
      fontSize: "0.8125rem",
      marginTop: "0.25rem",
      textAlign: "center",
    },

    socialButtonsBlockButton: {
      border: "0.5px solid var(--border)",
      borderRadius: "4px",
      backgroundColor: "transparent",
      boxShadow: "none",
      color: "var(--foreground)",
      fontWeight: "500",
      fontSize: "0.8125rem",
      height: "2.575rem",
      padding: "0 1rem",
    },
    socialButtonsBlockButtonText: {
      color: "var(--foreground)",
      fontWeight: "500",
    },

    dividerText: {
      color: "var(--muted-foreground)",
      fontSize: "0.75rem",
    },
    dividerLine: {
      backgroundColor: "var(--border)",
      height: "0.5px",
    },

    formFieldLabel: {
      color: "var(--muted-foreground)",
      fontSize: "0.75rem",
      fontWeight: "500",
      marginBottom: "0.275rem",
    },
    formFieldInput: {
      border: "none",
      backgroundColor: "transparent",
      color: "var(--foreground)",
      boxShadow: "none",
      outline: "none",
      fontSize: "0.875rem",
      height: "2.575rem",
      padding: "0 0.75rem",
    },
    formFieldRow: {
      marginBottom: "0",
    },
    formFieldInputShowPasswordButton: {
      color: "var(--muted-foreground)",
    },

    formButtonPrimary: {
      borderRadius: "2px",
      boxShadow: "none",
      fontWeight: "500",
      fontSize: "0.9125rem",
      letterSpacing: "-0.01em",
      textTransform: "none",
      height: "2.375rem",
      marginTop: "0.5rem",
    },

    footerActionText: {
      color: "var(--muted-foreground)",
      fontSize: "0.75rem",
    },
    footerActionLink: {
      color: "var(--foreground)",
      fontWeight: "500",
    },

    // Hide only Clerk branding, keep sign-up link
    footerPages: {
      display: "block",
    },
    footerPagesLink: {
      display: "none",
    },
  },
};