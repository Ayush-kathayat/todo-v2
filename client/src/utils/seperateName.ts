const seperateName = (username: string) => {
  let first = "";
  let last = "";
  for (let i = 0; i < username.length; i++) {
    // this is the condition to check if the username has a space, dot, underscore, hyphen, at the rate or hash
    if (
      username[i] === " " ||
      username[i] === "." ||
      username[i] === "_" ||
      username[i] === "-" ||
      username[i] === "@" ||
      username[i] === "#"
    ) {
      first = username.slice(0, i);
      last = username.slice(i + 1, username.length);
      return { first, last };
    }

    return { first: username, last: username[1] };
  }
};

export default seperateName;
