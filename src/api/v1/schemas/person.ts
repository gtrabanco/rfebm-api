import { t } from "elysia";
import { URL_NO_IMAGE_PERSON } from "../../../constants";

export const Person = t.Object({
  fullName: t.String(),
  profileImageUrl: t.String({
    default: URL_NO_IMAGE_PERSON,
  }),
  role: t.String(),
});
