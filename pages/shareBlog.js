function ShareBlog({ props }) {
    return (
      <>
          {props.data}
      </>
    )
  }
  export async function getServerSideProps() {
    // Get user id


      const res = await fetch("https://royalcoster.com:81/royalcoster/share/shareBlog.php");
      const data = await res.json();

      return {
        props: {
          data: data[0] || {},
        },
      };

  }

  export default ShareBlog
