import Users from "../../models/user";

import { throwError } from "../../utils/error-msg";

const GetUsers = async ({
  isAdmin
}) => {
  const filter = {
    isAdmin: { $eq: false }
  }
  if (isAdmin) {
    const count = await Users.find(filter).countDocuments();
    const users = await Users.find(filter).select({
      firstName: 1,
      lastName: 1,
      status: 1,
      email: 1,
      active: 1,
      companyName: 1,
      createdAt: 1
    });

    return {
      users,
      count
    }
  }

  throw throwError('Unauthorized!.', 401);
}

export default GetUsers;
