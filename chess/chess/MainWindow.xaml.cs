using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;
using System.IO;
using Microsoft.Speech.AudioFormat;
using Microsoft.Speech.Recognition;
using Microsoft.Kinect;
using System.Windows.Browser;
using WebSocket4Net;


namespace chess
{
    /// <summary>
    /// MainWindow.xaml の相互作用ロジック
    /// </summary>
        public partial class MainWindow : Window
        {

            //WebsocketのプロキシサーバーのURL設定
            private string serverURL = "ws://kgr.cs.inf.shizuoka.ac.jp:10808";

            private string channel = "cs12002";
            private string player = "player1";//プレイヤーの設定。これで対戦相手とかを識別

            private WebSocket websocket;
            private bool ready = false;
            private bool request1 = true;//JavaScriptからのリクエスト（コマの位置）
            private bool request2 = false;//JavaScriptからのリクエスト（移動先）

            private KinectSensor kinect;
            private SpeechRecognitionEngine sre;
            private String x = "?", y = "?";//座標指定用の変数

            //日本語音声認識エンジンの名前
            const string sreName = "SR_MS_ja-JP_Kinect_11.0";

            
            public MainWindow()
            {
                InitializeComponent();
                if (serverURL == "")
                {
                    MessageBox.Show("URLが設定されていません。");
                } else
                {
                    if (KinectSensor.KinectSensors.Count == 0)
                    {
                        MessageBox.Show("KINECTが見つかりません。");
                    }
                    textBox1.Text = channel;
                    websocket = new WebSocket(serverURL);
                    websocket.Closed += new EventHandler(websocket_Closed);
                    websocket.Error += new EventHandler<SuperSocket.ClientEngine.ErrorEventArgs>(websocket_Error);
                    websocket.MessageReceived += new EventHandler<MessageReceivedEventArgs>(websocket_MessageReceived);
                    websocket.Opened += new EventHandler(websocket_Opened);
                    websocket.Open();

                }
            }

            private bool sendMessage(string X, string Y)
            {
                if (ready)
                {
                    if (request1 || request2)
                    {
                        if (X != "?" && Y != "?")
                        {
                            //送信データを相手のJavaScript用に変換
                            switch (X)
                            {
                                case "A": Y = "0"; break;
                                case "B": Y = "1"; break;
                                case "C": Y = "2"; break;
                                case "D": Y = "3"; break;
                                case "E": Y = "4"; break;
                                case "F": Y = "5"; break;
                                case "G": Y = "6"; break;
                                case "H": Y = "7"; break;
                            }
                            switch (Y)
                            {
                                case "1": Y = "0"; break;
                                case "2": Y = "1"; break;
                                case "3": Y = "2"; break;
                                case "4": Y = "3"; break;
                                case "5": Y = "4"; break;
                                case "6": Y = "5"; break;
                                case "7": Y = "6"; break;
                                case "8": Y = "7"; break;
                            }
                            //入力した座標データを送信
                            websocket.Send(channel + ":" + player + ",cs," + X + "," + Y);//csはC♯から送信したことを表す
                            request1 = false;
                            request2 = false;
                            return true;
                        }
                        else
                        {
                            textBox.Text = "送信情報が正しく設定されていません";
                        }
                    }
                    else
                    {
                        textBox.Text = "JavaScriptからリクエストが来ていません";
                    }
                }
                else
                {
                    textBox.Text = "webSocketの準備が出来ていません";
                }
                return false;
            }

            private void websocket_Opened(object sender, EventArgs e)
            {
                this.Dispatcher.Invoke(DispatcherPriority.Background, new Action(() =>
                    {
                        //ここにGUI関連の処理を記入(接続完了など)
                        button1.IsEnabled = true;
                        textBlock2.Text = "接続完了";
                    }));
            }

            private void websocket_Error(object sender, SuperSocket.ClientEngine.ErrorEventArgs e)
            {
                ready = false;
                //以下のブロックはスレッドセーフにGUIを扱うおまじない
                this.Dispatcher.Invoke(DispatcherPriority.Background, new Action(() =>
                {
                    //ここにGUI関連の処理を書く。
                    textBlock2.Text = "未接続";
                    textBlock3.Text = "[error] " + e.Exception.Message + "\n";
                    button1.IsEnabled = false;
                    
                }));
                MessageBox.Show("予期しないエラーで通信が途絶しました。再接続には起動しなおしてください。");
            }

            private void websocket_Closed(object sender, EventArgs e)
            {
                ready = false;
                //以下のブロックはスレッドセーフにGUIを扱うおまじない
                this.Dispatcher.Invoke(DispatcherPriority.Background, new Action(() =>
                {
                    //ここにGUI関連の処理を書く。
                    textBlock2.Text = "未接続";
                    textBlock3.Text = "[closed]\n";
                    button1.IsEnabled = false;

                }));
                MessageBox.Show("サーバがコネクションを切断しました。");
            }

            private void websocket_MessageReceived(object sender, MessageReceivedEventArgs e)
            {
                //  データ受信(サーバで当該チャンネルのモノのみ送る処理をしているが一応チェック)
                if (e.Message.IndexOf(channel + ":") == 0)
                {
                    //チャンネル名などをメッセージから削除
                    string msg = e.Message.Substring(e.Message.IndexOf(":") + 1);
                    //ここから実際の処理に合わせて変更
                    string[] fields = msg.Split(new char[] { ',' });
                    if (fields[0].Equals(player))
                    {
                        //fields[1]はjsかcsかの確認のため自分のJavaScriptからしかmessageを受け取らないため使用しない
                        if(fields[2] =="request1")
                        {
                            textBlock2.Text = "リクエストが入りました";
                            request1 = true;
                            request2 = false;
                        }
                        else if(fields[2] == "request2")
                        {
                            request1 = false;
                            request2 = true;
                        }
                    }
                    this.Dispatcher.Invoke(DispatcherPriority.Background, new Action(() =>
                    {
                        //ここにGUI関連の処理を書く。
                    }));

                }
                else if (e.Message == channel + ";")
                {
                    //ハンドシェイク完了の受信
                    ready = true;
                    this.Dispatcher.Invoke(DispatcherPriority.Background, new Action(() =>
                    {
                        //GUIの処理を記入
                        textBlock2.Text = "ハンドシェイク完了";
                        button1.IsEnabled = false;
                    }));
                }
            }

            private void button1_Click(object sender, RoutedEventArgs e)
            {
                if (System.Text.RegularExpressions.Regex.IsMatch(textBox1.Text, @"^[a-zA-Z0-9]+$"))
                {
                    button1.IsEnabled = false;
                    channel = textBox1.Text;
                    //ハンドシェイクを送信
                    websocket.Send(channel + ":");
                }
                else
                {
                    MessageBox.Show("チャンネルは半角英数字のみ！");
                }
            }

            private void button2_Click(object sender, RoutedEventArgs e)
            {
                if (request1 || request2)
                {
                    //情報を送信
                    bool isSent =sendMessage(x, y);
                    if (isSent)
                    {
                        button2.IsEnabled = false;
                        x = "?";
                        y = "?";
                    }
                }

            }

            private void Window_Loaded(object sender, RoutedEventArgs e)
            {
                    //KINECTの初期化
                    kinect = KinectSensor.KinectSensors[0];

                    //音声認識エンジンの初期化
                    sre = new SpeechRecognitionEngine(sreName);

                    //認識したい単語の設定
                    var word = new Choices();

                    //好きな単語を登録する。
                    word.Add(new SemanticResultValue("いち","1"));//1
                    word.Add(new SemanticResultValue("に","2"));//2
                    word.Add(new SemanticResultValue("さん", "3"));//3
                    word.Add(new SemanticResultValue("よん", "4"));//4
                    word.Add(new SemanticResultValue("ご", "5"));//5
                    word.Add(new SemanticResultValue("ろく", "6"));//6
                    word.Add(new SemanticResultValue("なな", "7"));//7
                    word.Add(new SemanticResultValue("はち", "8"));//8
                    word.Add(new SemanticResultValue("エー","A"));//A
                    word.Add(new SemanticResultValue("ビー","B"));//B
                    word.Add(new SemanticResultValue("シー","C"));//C
                    word.Add(new SemanticResultValue("ディー","D"));//D
                    word.Add(new SemanticResultValue("イー","E"));//E
                    word.Add(new SemanticResultValue("エフ","F"));//F
                    word.Add(new SemanticResultValue("ジー","G"));//G
                    word.Add(new SemanticResultValue("エイチ","H"));//H
                    word.Add(new SemanticResultValue("オーケー","OK"));

                    //グラマービルダーの設定
                    var gb = new GrammarBuilder();

                    //グラマービルダーの言語設定を認識エンジンに合わせる
                    gb.Culture = sre.RecognizerInfo.Culture;

                    //グラマービルダーに単語を登録
                    gb.Append(word);

                    //グラマービルダーをもとにグラマーを設定
                    var g = new Grammar(gb);

                    //認識エンジンにグラマーを登録
                    sre.LoadGrammar(g);

                    //イベントの登録
                    sre.SpeechRecognized += new EventHandler<SpeechRecognizedEventArgs>(sre_SpeechRecognized);
                    sre.SpeechRecognitionRejected += new EventHandler<SpeechRecognitionRejectedEventArgs>(sre_SpeechRecognitionRejected);

                    //KINECTのスタート
                    kinect.Start();

                    //KINECTのマイク入力
                    KinectAudioSource audio = kinect.AudioSource;
                    audio.AutomaticGainControlEnabled = false;
                    audio.EchoCancellationMode = EchoCancellationMode.None;

                    //マイク入力開始
                    Stream s = audio.Start();
                    textBox.Text = "座標を入力してください";
                    //オーディオフォーマットの設定
                    var speechAudioFormat = new SpeechAudioFormatInfo(EncodingFormat.Pcm,16000,16,1,32000,2,null);

                    //認識エンジンに入力ストリームとフォーマットを指定
                    sre.SetInputToAudioStream(s, speechAudioFormat);

                    //認識開始（非同期、複数認識を有効にする。）　
                    //※認識が可能になるのが数秒かかる
                    sre.RecognizeAsync(RecognizeMode.Multiple);
                

            }

            
            void sre_SpeechRecognitionRejected(object sender, SpeechRecognitionRejectedEventArgs e)
            {
                textBlock5.Text = "認識できません。";
            }

            
            void sre_SpeechRecognized(object sender, SpeechRecognizedEventArgs e)
            {
                //（認識信頼度　-1<0<1 -1が低信頼度　0が標準　1が高信頼度　数字が大きいほど認識率が厳しくなる）　
                if (e.Result.Confidence >= 0.7)
                {
                    //認識信頼度の表示
                    textBlock7.Text = e.Result.Confidence.ToString();
                    String str =e.Result.Semantics.Value.ToString();
                    //認識した単語の表示
                    textBlock5.Text = str;
                    switch (str)
                    {
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                        case "5":
                        case "6":
                        case "7":
                        case "8":
                            y = str;
                            break;

                        case "A":
                        case "B":
                        case "C":
                        case "D":
                        case "E":
                        case "F":
                        case "G":
                        case "H":
                            x = str;
                            break;
                        
                        case "OK":
                            //情報を送信
                            bool isSent = sendMessage(x, y);
                            if (isSent)
                            {
                                x = "?";
                                y = "?";
                            }
                            break;

                    }
                }
                if (request1)
                {
                    textBlock12.Text = x;
                    textBlock13.Text = y;
                }
                else if (request2)
                {
                    textBlock14.Text = x;
                    textBlock15.Text = y;

                }
                else
                {
                    textBlock12.Text = "";
                    textBlock13.Text = "";
                    textBlock14.Text = "";
                    textBlock15.Text = "";
                }
                if (x != "?" && y != "?")
                {
                    button2.IsEnabled = true;
                }
            }
            


            private void Window_Closed(object sender, EventArgs e)
            {
                if (kinect != null)
                {
                    if (kinect.IsRunning == true)
                    {
                        kinect.AudioSource.Stop();
                        kinect.Stop();
                        sre.RecognizeAsyncStop();
                        kinect.Dispose();
                    }
                }
            }

        }
    }
