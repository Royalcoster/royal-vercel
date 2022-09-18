<?php
error_reporting(E_ALL);
  ini_set('display_errors', 1);
  require("wp-load.php");
  doCopy();
  function doCopy($page = 1) {
      $url = "https://costerdiamonds.com/nl/wp-json/wp/v2/blogs?page=" . $page;
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $server_output =  (array) json_decode(curl_exec($ch));
      if ($server_output["code"] == "rest_post_invalid_page_number") {
        echo "done";
        return;
      }
      foreach($server_output as $k => $v) {
          $slor = $v->slug;
          $url = process.env.Ne"/wordpress/wp-json/wp/v2/blogs?slug=" . $slor;
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          $server_output =  (curl_exec($ch));
          $resp =  json_decode($server_output);
          curl_close($ch);
          var_dump($slor . " ==== " . count($resp));
          if (count($resp) == 0) {
            $url = "https://costerdiamonds.com/wp-json/wp/v2/blogs?slug=" . $slor;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $server_output =  (curl_exec($ch));
            $r =  json_decode($server_output);
             $post_data = array(
              'post_title'    => $r[0]->title->rendered,
              'post_type'     => 'blog',
              'post_status'   => 'publish',
              'slug'          => $r[0]->slug
            );
            $post_id = wp_insert_post( $post_data );
            $flds = (array) $r[0]->acf;
            foreach ($flds as $k => $v) {
              $field = acf_get_field($k, true);
              var_dump(update_field($field["key"], $r[0]->acf->$k, $post_id));
              echo "<br />";
            }
            echo "Done " . $slor . "<br />";
            do_action( 'acf/save_post', $post_id );

            sleep(5);
        }
      }
      $page++;

      doCopy($page);
}
 ?>
</html>
