import { stdin, stdout } from "node:process";
import bcrypt from "bcryptjs";

if (!stdin.isTTY) {
  console.error("Run this script in an interactive terminal.");
  process.exit(1);
}

function readHidden(prompt) {
  return new Promise((resolve) => {
    stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";

    const onData = (character) => {
      if (character === "\u0003") {
        stdin.setRawMode(false);
        stdin.pause();
        process.exit(130);
      }
      if (character === "\r" || character === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        stdout.write("\n");
        resolve(value);
        return;
      }
      if (character === "\u007f" || character === "\b") {
        value = value.slice(0, -1);
        return;
      }
      if (!/[\u0000-\u001f\u007f]/.test(character)) value += character;
    };

    stdin.on("data", onData);
  });
}

const password = await readHidden(
  "Nouveau mot de passe administrateur (saisie masquée) : ",
);

if (password.length < 16) {
  console.error("Use a unique password of at least 16 characters.");
  process.exit(1);
}

const passwordConfirmation = await readHidden(
  "Confirmez le mot de passe (saisie masquée) : ",
);

if (passwordConfirmation !== password) {
  console.error("The passwords do not match.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log("\nValeur à enregistrer comme ADMIN_PASSWORD_HASH_B64 :");
console.log(Buffer.from(hash, "utf8").toString("base64"));
