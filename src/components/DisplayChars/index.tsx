import callAPI from "../../config/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API_HOST, getAccount } from "../Utils";

const MySwal = withReactContent(Swal);

function DisplayChars({ ucp }) {
  const [allChars, setAllChars] = useState(undefined);

  const router = useRouter();

  const deleteChar = async (charid) => {
    MySwal.fire({
      title: "Delete Character",
      text: `Are you sure? Want to delete character ID ${charid}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const res = await callAPI({
          url: `/api/char/delete/${charid}`,
          method: "DELETE",
        });

        if (!res.success) {
          MySwal.showValidationMessage(`Request failed: ${res.error}`);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your character has been deleted.",
          icon: "success",
        });

        router.reload();
      }
    });
  };

  useEffect(() => {
    if (ucp.success) {
      setAllChars(ucp.data);
    }
  }, [ucp]);

  return (
    <div>
      <style jsx>
        {`
          table:hover {
            cursor: pointer;
          }

          .responsive-table {
            display: block;
            height: 300px;
            max-width: 100%;
            overflow-x: auto;
            overflow-y: auto;
          }

          tr:hover {
            color: #ccc;
          }
        `}
      </style>
      <h3 className="h3 text-center m-3">Your Characters</h3>
      <div className="responsive-table">
        <table
          className="table table-responsive text-white"
          style={{ backgroundColor: "#141432" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Character</th>
              <th>Level</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allChars !== undefined ? (
              allChars.map((char) => (
                <tr key={char.ID} style={{ verticalAlign: "text-top" }}>
                  <td>{`#${char.ID}`}</td>
                  <td>
                    {char.Character.split("_")[0] +
                      " " +
                      char.Character.split("_")[1]}
                  </td>
                  <td>{char.pScore}</td>
                  <td>{char.Gender === 1 ? "Male" : "Female"}</td>
                  <td>
                    <Link href={`/dashboard/char/${char.ID}`}>
                      <a
                        className="btn btn-fill text-white p-2 mx-2"
                        style={{ fontSize: "1rem" }}
                      >
                        Details
                      </a>
                    </Link>
                    <a
                      className="btn btn-default btn-no-fill p-2 mx-2"
                      href="#"
                      style={{ fontSize: "1rem" }}
                      onClick={() => deleteChar(char.ID)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;

  const account = await getAccount(token);

  const res = await callAPI({
    url: `${API_HOST}/getchar`,
    method: "POST",
    data: {
      all: true,
      ucp: account.username,
    },
    token: true,
  });

  return {
    props: {
      ucp: res,
    },
  };
}

export default DisplayChars;
