use actix_web::{web, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;

mod actor;
use actor::WebSocketActor;

pub async fn handler(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    ws::start(WebSocketActor::new(), &req, stream)
}
