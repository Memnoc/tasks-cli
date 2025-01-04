declare module "better-cli-alerts" {
  interface AlertOptions {
    type: "success" | "info" | "warning" | "error";
    message: string;
    description: string;
  }

  function alert(options: AlertOptions): void;
  export default alert;
}
