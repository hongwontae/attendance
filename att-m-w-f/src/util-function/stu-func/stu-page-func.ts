// Custom Input UX Upgrade

export const phoneRefine = (e: React.FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value.replace(/[^0-9]/g, "");

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length >= 7) {
    value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
  } else if (value.length >= 4) {
    value = value.replace(/(\d{3})(\d+)/, "$1-$2");
  }

  e.currentTarget.value = value;
};

export const nameRefine = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, "");
};

export const ageRefine = (e: React.FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value.replace(/[^0-9]/g, "");

  if (!value) {
    e.currentTarget.value = "";
    return;
  }

  let num = Number(value);

  if (num > 120) num = 120;

  e.currentTarget.value = String(num);
};

export const emailRefine = (e: React.FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value;

  value = value.replace(/\s/g, "");
  value = value.toLowerCase();

  e.currentTarget.value = value;
};
