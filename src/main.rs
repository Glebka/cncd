use actix_files as fs;
use actix_web::{middleware, web, App, HttpServer};

mod comm_async;
mod websocket;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("starting HTTP server at 0.0.0.0:8080");
    log::info!("Open http://localhost:8080/ in browser");
    HttpServer::new(|| {
        // keep scope
        App::new()
            .service(web::resource("/ws").route(web::get().to(websocket::handler)))
            .service(fs::Files::new("/", "./static").index_file("index.html"))
            .wrap(middleware::Logger::new("%a %r %s %b %T"))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
