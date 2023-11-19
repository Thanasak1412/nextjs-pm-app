type Fetcher = {
  url: string;
  method: "POST" | "GET" | "PUT";
  body: {
    [key: string]: any;
  };
  json?: boolean;
};

export async function fetcher({ url, method, body, json = false }: Fetcher) {
  const options = {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`/api/${url}`, options);

  let data;
  if (json) {
    const response = await res.json();
    data = response.data;
  }

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return data;
}

type User = {
  email: string;
  password: string;
};

export function signIn(user: User) {
  return fetcher({ url: "signin", method: "POST", body: user });
}

export function register(user: User) {
  return fetcher({ url: "register", method: "POST", body: user });
}

export function createNewProject(name: string) {
  return fetcher({
    url: "project",
    method: "POST",
    body: { name },
    json: true,
  });
}
