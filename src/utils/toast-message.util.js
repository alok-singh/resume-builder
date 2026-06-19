import { toast } from "sonner";

export const showAPIResponseToastMessage = (result) => {
  if (result?.response?.errors) {
    result?.response?.errors?.forEach(element => {
      toast.error(element.errorTitle, {
        description: element.errorDescription,
      });
    });
  } else {
    toast.success(result.responseMessage, {
      description: result?.response?.message || "Successfully fetched data"
    });
  }
}