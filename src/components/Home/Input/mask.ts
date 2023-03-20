export function phoneNumber(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15;
  let valueInput = e.currentTarget.value;
  valueInput = valueInput.replace(/\D/g, "");
  valueInput = valueInput.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3");
  e.currentTarget.value = valueInput;
  return e
}
