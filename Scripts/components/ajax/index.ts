export class Ajax 
{

    protected static getCookie(cname: string) 
    {
        var name: string = cname + "=";
        var decodedCookie: string = decodeURIComponent(document.cookie);
        var ca: string[] = decodedCookie.split(";");

        for(var i: number = 0; i < ca.length; i++) 
        {
            var c: string = ca[i];

            while (c.charAt(0) == " ") 
            {
                c = c.substring(1);
            }

            if(c.indexOf(name) == 0)
            {
                return c.substring(name.length, c.length);
            }

            return "";
        }

    }

    public static READ(url: string, success: any)
    {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }

    public static WRITE(method: string, url: string, body, success: any)
    {
        var csrftoken: string = this.getCookie("CSRF-TOKEN");
        var params: string = typeof body == 'string' ? body : Object.keys(body).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(body[k]) }
            ).join('&');

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open(method, url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.send(params);
        return xhr;
    }
}
