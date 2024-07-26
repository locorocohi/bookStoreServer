import { AppDataSource } from "./database/data-source"
import app from "./app";
import { config } from "../config";

(async () => {
    await AppDataSource.initialize().catch((error) => console.log(error));
    app.listen(config.PORT, () => {
      console.log(`Server start on PORT: ${config.PORT}`);
    });
  })();
