<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GeotagNotification extends Notification
{
    use Queueable;

    /**
     * @var array
     */
    private array $data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Geotag Notification.')
            ->greeting('Hi '.$this->data['user_name']. ',')
            ->line('There is a new post from '.$this->data['posted_user'].'.')
            ->line("\n")
            ->line('Place name: '.$this->data['geotag_name'])
            ->line('Place description: '.$this->data['geotag_desc'])
            ->line('Longitude: '.$this->data['geotag_lon'])
            ->line('Latitude: '.$this->data['geotag_lat']);
    }
}
